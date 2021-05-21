const db = require("../models");
const Project = db.project;

exports.newProject = (req, res) => {
    console.log('NEEEEEW')
    const data = req.body;
    const newProject = new Project(data);
    newProject.save((error) => {
        if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
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
