const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    contact: String,
    address: String,
    gender: String,
    country: String,
  })
);

module.exports = User;
