const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const sendNotification = asyncHandler(async (req, res) => {
  const { chat, notifiedUsers } = req.body;
  if (!chat || !notifiedUsers) {
    console.log("Chat Id  or notifiedUsers list is null");
    return res.status(400);
  }
  let parsedNotifiedUsers = JSON.parse(notifiedUsers);
  try {
    let newNotification = {
      chat: chat,
      notifiedUsers: parsedNotifiedUsers,
    };
    let notification = await Notification.create(newNotification);
    notification = await Notification.findOne({
      _id: notification._id,
    })
      .populate("chat")
      .populate("notifiedUsers", "-password");

    return res.send(notification);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchNotification = asyncHandler(async (req, res) => {
  try {
    let notifications = await Notification.find({
      notifiedUsers: { $in: [req.user._id] },
    }).populate("chat");
    notifications = await User.populate(notifications, {
      path: "chat.users",
      select: "name pic email",
    });

    return res.send(notifications);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;
  try {
    console.log(notificationId);
    let notification = await Notification.findOneAndDelete({
      _id: notificationId,
    });
    console.log(notification);
    return res.send(notification);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendNotification, fetchNotification, deleteNotification };
