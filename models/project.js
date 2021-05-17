const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
    projectName: String,
    projectDescription: String,
    projectAuthor: String,
    projectDate: {
        type: String,
        default: Date.now()
    }
})

//Model
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;