const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
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
  ]
  })
);

module.exports = User;