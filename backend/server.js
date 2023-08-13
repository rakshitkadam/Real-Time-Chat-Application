const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("API is invoked");
});
app.get("/api/chats", (req, res) => {
  res.send([{ chat: "Chats will be displayed" }, { chat: "Hello" }]);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server has started"));
