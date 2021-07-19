const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    emailVerified: Boolean,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tickets'
      }
    ]
  })
);

module.exports = User;