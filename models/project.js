const mongoose = require('mongoose');

const Project = mongoose.model(
    "Project",
    new mongoose.Schema({
        projectName: String,
        projectDescription: String,
        projectAuthor: String,
        projectDate: {
            type: String,
            default: Date.now()
        },
        projectUser: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    })
)
//Model
module.exports = Project;