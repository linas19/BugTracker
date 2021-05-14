const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
    projectName: String,
    description: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//Model
const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;