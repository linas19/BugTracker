const db = require("../models");
const Project = db.project;
const User = db.user;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.newProject = (req, res) => {
    const data = req.body;
    const newProject = new Project(data);
    let token = req.headers["x-access-token"]
    const decoded = jwt.verify(token, config.secret)
    newProject.save((error, project) => {
        if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            User.findByIdAndUpdate(decoded.id, {"projects": project.id}, function (err, docs) {
                if (err){
                    console.log('did not update user projects',err)
                }
                else{
                    console.log("Updated User Projects: ", docs);
                }
            })
            res.json({
                msg: 'Your project data was saved!!!HAHA'
            })
        }
    })
}
exports.showProjects = (req, res) => {
    console.log('result show', res)
    Project.find({})
        .then((data) => {
            console.log('Project Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
}
