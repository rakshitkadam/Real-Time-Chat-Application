const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  sendNotification,
  fetchNotification,
  deleteNotification,
} = require("../controllers/notificationController.js");
const router = express.Router();
router.route("/").post(protect, sendNotification);
router.route("/").get(protect, fetchNotification);
router.route("/delete/:id").delete(protect, deleteNotification);
module.exports = router;
