const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerController,
  loginController,
  authController,
  addTableController,
  getalltablesController,
  bookTableController,
  getAllBookingsController,
  statusChangeController,
  forgotPasswordController,
  statusRejectChangeController,
  statusApproveChangeController,
  getAllTablesForOrganization,
} = require("../controllers/userController");

const router = express.Router();

// User registration and login routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgotpassword", forgotPasswordController);

// Authenticated user data route
router.post("/getuserdata", authMiddleware, authController);

// Table-related routes
router.get("/getalltables", getalltablesController); // Public access
router.get('/getalltables/:userId', authMiddleware, getAllTablesForOrganization); // Authenticated access
router.post('/addtable/:userId', authMiddleware, addTableController);

// Booking-related routes
router.post('/booktable/:hotelId', authMiddleware, bookTableController);
router.get('/allbooking', authMiddleware, getAllBookingsController);

// Status change routes
router.post('/approve', authMiddleware, statusApproveChangeController);
router.post('/reject', authMiddleware, statusRejectChangeController);

module.exports = router;
