const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db");
const app = express();
const userRoutes = require("../backend/routes/userRoutes");
const chatRoutes = require("../backend/routes/chatRoutes");
const messageRoutes = require("../backend/routes/messageRoutes");
const {
  errorHandler,
  notFound,
} = require("../backend/middlewares/errorMiddleware");

dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server has started"));
