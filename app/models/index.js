const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.deletedToken = require("./deletedToken.model");

module.exports = db;
