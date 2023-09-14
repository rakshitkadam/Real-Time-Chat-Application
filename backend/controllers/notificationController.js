const asyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const sendNotification = asyncHandler(async (req, res) => {
  const { chat, notificationNotSeenBy } = req.body;
  if (!chat || !notificationNotSeenBy) {
    console.log("Chat Id  or notificationNotSeenBy list is null");
    return res.status(400);
  }
  let parsednotificationNotSeenBy = JSON.parse(notificationNotSeenBy);
  try {
    let newNotification = {
      chat: chat,
      notificationNotSeenBy: parsednotificationNotSeenBy,
    };
    let notification = await Notification.create(newNotification);
    notification = await Notification.findOne({
      _id: notification._id,
    })
      .populate("chat")
      .populate("notificationNotSeenBy", "-password");

    return res.send(notification);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchNotification = asyncHandler(async (req, res) => {
  try {
    let notifications = await Notification.find({
      notificationNotSeenBy: { $in: [req.user._id] },
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

const updateNotificationNotSeenBy = asyncHandler(async (req, res) => {
  // this api updates the notificationNotSeenBy, removes the current user from it as its viewed by the user
  const notificationId = req.params.id;
  if (!notificationId) {
    console.log("NotificationId  is null");
    return res.status(400);
  }
  try {
    let notification = await Notification.findOne({
      _id: notificationId,
    })
      .populate("chat")
      .populate("notificationNotSeenBy", "-password");

    if (
      !notification.notificationNotSeenBy.find((ele) =>
        ele._id.equals(req.user._id)
      )
    ) {
      throw new Error(
        "User is already removed from the notificationNotSeenBy list"
      );
    }

    if (notification.notificationNotSeenBy.length === 1) {
      //  the only remaining person to view notification has viewed it, we need to delete the
      //  notification from db
      notification = await deleteNotification(notificationId);
      console.log(`${notification} is deleted`);
      res.send(notification);
    } else {
      let updatedNotificationNotSeenBy =
        notification.notificationNotSeenBy.filter(
          (ele) => !ele._id.equals(req.user._id)
        );

      let updatedNotification = await Notification.findByIdAndUpdate(
        notificationId,
        {
          notificationNotSeenBy: updatedNotificationNotSeenBy,
        },
        {
          new: true,
        }
      );
      res.send(updatedNotification);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteNotification = async (notificationId) => {
  try {
    let notification = await Notification.findOneAndDelete({
      _id: notificationId,
    });
    return notification;
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = {
  sendNotification,
  fetchNotification,
  updateNotificationNotSeenBy,
};
