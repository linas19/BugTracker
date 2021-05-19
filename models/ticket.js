const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TicketSchema = new Schema({
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

//Model
const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;