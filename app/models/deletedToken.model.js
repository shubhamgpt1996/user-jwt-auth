const mongoose = require("mongoose");

const DeletedToken = mongoose.model(
  "DeletedToken",
  new mongoose.Schema({
    token: String
  })
);

module.exports = DeletedToken;