const mongoose = require('mongoose');

const Ticket = mongoose.model(
    "Ticket",
    new mongoose.Schema({
        ticketName: { type: String, required: true, unique: true },
        ticketAuthor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        ticketSolver: String,
        ticketPriority: String,
        ticketType: String,
        ticketStatus: String,
        ticketDate: {
            type: String,
            default: Date.now()
        },
        ticketComment: Array,
        ticketProject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    })
)
//Model
module.exports = Ticket;