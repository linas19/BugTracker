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
        user: {
            type: mongoose.Schema.ObjectId, 
            ref: 'User'
        }
    })
)
//Model
module.exports = Project;