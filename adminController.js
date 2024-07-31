const userSchema = require("../schemas/userModel");
const tableSchema = require("../schemas/tableModel");
const bookingSchema = require("../schemas/bookingModel");

///////for all users
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find({});
    res.status(201).send({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

const getAllBookingsController = async (req, res) => {
  try {
    const allBookings = await bookingSchema.find({});

    res.status(201).send({
      success: true,
      data: allBookings,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `${error.message}` });
  }
};

///////for all users
const getAllTablesController = async (req, res) => {
   try {
     const allTables = await tableSchema.find({});
     res.status(201).send({
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

module.exports = {
  getAllUsersController,
  getAllBookingsController,
  getAllTablesController,
};
