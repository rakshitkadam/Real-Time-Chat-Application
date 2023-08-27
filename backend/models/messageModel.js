const mongoose = require("mongoose");

const messageModelSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chats" },
  },
  {
    timestamp: true,
  }
);

const Message = mongoose.model("Message", messageModelSchema);
module.exports = Message;
