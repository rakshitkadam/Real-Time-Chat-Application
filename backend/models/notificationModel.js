const mongoose = require("mongoose");

const notificationModelSchema = mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
    },
    notificationNotSeenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamp: true,
  }
);

const Notification = mongoose.model("Notification", notificationModelSchema);
module.exports = Notification;
