const express = require('express');
const router = express.Router();
const Project = require('../models/project.js')
const Ticket = require('../models/ticket.js')
const User = require('../models/user.js')
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const Role = require('../models/role.js')


router.get('/currentUser', (req, res) => {
    let token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    User.findById(decoded.id)
        .then((data) => {
            console.log('user Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
})
// router.get('/projects', (req, res) => {
//     Project.find({})
//         .then((data) => {
//             console.log('Project Data: ', data)
//             res.json(data)
//         })
//         .catch((error) => {
//             console.log('error', error)
//         })
// })

router.get('/tickets', (req, res) => {
    Ticket.find({})
        .then((data) => {
            console.log('Ticket Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', daerrorta)
        })
})
router.post('/tickets', (req, res) => {
    console.log('BODY: ', req.body)
    const data = req.body;
    const newTicket = new Ticket(data);
    newTicket.save((error) => {
        if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            res.json({
                msg: 'Your ticket data was saved!!!'
            })
        }
    })
})
module.exports = router;