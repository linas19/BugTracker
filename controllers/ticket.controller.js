const db = require("../models");
const Ticket = db.ticket;

exports.newTicket = (req, res) => {
    console.log('NEEEEEW')
    const data = req.body;
    const newTicket = new Ticket(data);
    newTicket.save((error) => {
        if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            res.json({
                msg: 'Your ticket data was saved!!!HAHA'
            })
        }
    })
}
exports.showTickets = (req, res) => {
    console.log('result show', res)
    Ticket.find({})
        .then((data) => {
            console.log('Ticket Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
}
