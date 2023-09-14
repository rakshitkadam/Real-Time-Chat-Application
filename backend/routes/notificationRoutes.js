const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  sendNotification,
  fetchNotification,
  updateNotificationNotSeenBy,
} = require("../controllers/notificationController.js");
const router = express.Router();
router.route("/").post(protect, sendNotification);
router.route("/").get(protect, fetchNotification);
router.route("/update/:id").put(protect, updateNotificationNotSeenBy);
module.exports = router;
