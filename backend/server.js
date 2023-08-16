const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../backend/config/db");
const app = express();
const userRoutes = require("../backend/routes/userRoutes");
const {
  errorHandler,
  notFound,
} = require("../backend/middlewares/errorMiddleware");

dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/api/chats", (req, res) => {
  res.send([{ chat: "Chats will be displayed" }, { chat: "Hello" }]);
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server has started"));
