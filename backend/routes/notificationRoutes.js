const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  sendNotification,
  fetchNotification,
} = require("../controllers/notificationController.js");
const router = express.Router();
router.route("/").post(protect, sendNotification);
router.route("/").get(protect, fetchNotification);
module.exports = router;
