const mongoose = require('mongoose');

const Ticket = mongoose.model(
    "Ticket",
    new mongoose.Schema({
        ticketName: { type: String, required: true, unique: true },
        ticketProject: String,
        // ticketAuthor: { type: Schema.Types.ObjectId, ref: 'Project' },
        ticketSolver: String,
        ticketPriority: String,
        ticketType: String,
        ticketStatus: String,
        ticketDate: {
            type: String,
            default: Date.now()
        },
        ticketComment: Array
    })
)
//Model
module.exports = Ticket;