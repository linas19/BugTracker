const db = require("../models");
const Ticket = db.ticket;
const User = db.user;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.newTicket = (req, res) => {
    console.log('NEEEEEW')
    const data = req.body;
    let token = req.headers["x-access-token"]
    const decoded = jwt.verify(token, config.secret)
    const newTicket = new Ticket({ ...data, ticketAuthor: decoded.id })
    newTicket.save((error, ticket) => {
        if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            User.findByIdAndUpdate(decoded.id, {"tickets": ticket.id}, function (err, docs) {
                if (err){
                    console.log('did not update user projects',err)
                }
                else{
                    
                    console.log("Updated User Projects: ", docs);
                }
            })
            res.json({
                msg: 'Your ticket data was saved!!!HAHA'
            })
        }
    })
}
exports.showTickets = (req, res) => {
    // console.log('result show', res)
    console.log('reqQQ:', req.params)
    let token = req.headers["x-access-token"]
    const decoded = jwt.verify(token, config.secret)
    Ticket.find({ ticketAuthor: decoded.id })
        .then((data) => {
            console.log('Ticket Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
}
