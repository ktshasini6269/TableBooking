const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllUsersController,
  getAllBookingsController,
  getAllTablesController,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/getallusers", authMiddleware, getAllUsersController);

router.get("/getallbookings", authMiddleware, getAllBookingsController);

router.get("/getalltables", authMiddleware, getAllTablesController);

module.exports = router;
