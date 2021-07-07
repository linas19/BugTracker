const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.project = require("./project");
db.ticket = require("./ticket")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;