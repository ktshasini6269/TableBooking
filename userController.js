const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userModel");
const tableSchema = require("../schemas/tableModel");
const bookingSchema = require("../schemas/bookingModel");


///////for registeration
const registerController = async (req, res) => {
  try {
    const existsUser = await userSchema.findOne({ email: req.body.email });
    if (existsUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userSchema(req.body);
    await newUser.save();

    return res.status(201).send({ message: "Register Success", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////for the login
const loginController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    user.password = undefined;
    return res.status(200).send({
      success: true,
      token,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

/////forgotting password

const forgotPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await userSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }

    await updatedUser.save();
    return res.status(200).send({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////auth controller
const authController = async (req, res) => {
  console.log(req.body);
  try {
    const user = await userSchema.findOne({ _id: req.body.userId });
    console.log(user);
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    } else {
      return res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "auth error", success: false, error });
  }
};

//////add tables by organization////////////
const addTableController = async (req, res) => {
  try {
    const user = await userSchema.findById({ _id: req.params.userId });
    const tabledata = { ...req.body, hotelInfo: user };
    const table = new tableSchema(tabledata);
    await table.save();

    return res.status(200).send({
      message: "Table added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    if (!error._message || error instanceof mongoose.Error)
      throw Error("Internal server error!");
    else next(new HttpException(`Bad request`, 400));
  }
};

////get all tables in home page/////////////////
const getalltablesController = async (req, res) => {
  try {
    const allTables = await tableSchema.find({});
    return res.status(200).send({
      success: true,
      data: allTables,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

/////////booking table////////////
const bookTableController = async (req, res) => {
  try {
    const hotel = await userSchema.findById({ _id: req.params.hotelId });
    const bookingData = {
      ...req.body,
      hotelId: req.params.hotelId,
      status: "pending",
      hotelName: hotel.name,
    };
    const booking = new bookingSchema(bookingData);

    await booking.save();
    return res.status(200).send({
      success: true,
      message: "Your booking has been done",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

////////All bookings in both customer and organization
const getAllBookingsController = async (req, res) => {
  try {
    switch (req.query.type) {
      case "Organization":
        const allBookingsH = await bookingSchema.find({
          hotelId: req.body.userId,
        });
        return res.status(200).send({
          success: true,
          data: allBookingsH,
        });
        break;
      case "Customer":
        const allBookingsC = await bookingSchema.find({
          userId: req.body.userId,
        });
        return res.status(200).send({
          success: true,
          data: allBookingsC,
        });
      default:
        return res.status(201).send({
          data: "No records",
        });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

///////status change by organization////////
const statusApproveChangeController = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const booking = await bookingSchema.findOneAndUpdate(
      { _id: bookingId },
      { status: status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }
    await booking.save();

    return res.status(200).send({
      success: true,
      message: "Booking status changed successfully",
      data: booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while updating the booking status",
    });
  }
};

const statusRejectChangeController = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const booking = await bookingSchema.findOneAndUpdate(
      { _id: bookingId },
      { status: status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }
    await booking.save();

    return res.status(200).send({
      success: true,
      message: "Booking status changed successfully",
      data: booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while updating the booking status",
    });
  }
};

////getting all tables for particular organization
const getAllTablesForOrganization = async (req, res) => {
  const { userId } = req.params;
  try {
    const getAllTables = await tableSchema.find();
    const updatedTables = getAllTables.filter(
      (table) => table.hotelInfo._id.toString() === userId
    );
    return res.status(200).send({
      success: true,
      data: updatedTables,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  authController,
  addTableController,
  getalltablesController,
  bookTableController,
  getAllBookingsController,
  statusApproveChangeController,
  statusRejectChangeController,
  getAllTablesForOrganization,
};
