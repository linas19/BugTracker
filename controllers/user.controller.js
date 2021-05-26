const User = require("../models/user");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Developer Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.addProject = function(req, res) {
  let token = req.headers["x-access-token"]
  const decoded = jwt.verify(token, config.secret)
  User.findByIdAndUpdate({decoded}, {"projects": req.body._id}
    )
}