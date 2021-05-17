const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js')
const Ticket = require('../models/ticket.js')

router.get('/', (req, res) => {
    // Project.find({})
    //     .then((data) => {
    //         console.log('Project Data: ', data)
    //         res.json(data)
    //     })
    //     .catch((error) => {
    //         console.log('error', error)
    //     })
    Ticket.find({})
        .then((data) => {
            console.log('Ticket Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', error)
        })
})
router.post('/saveProject', (req, res) => {
    console.log('BODY: ', req.body)
    const data = req.body;
    const newProject = new Project(data);
    newProject.save((error) => {
        if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            res.json({
                msg: 'Your data was saved!!!'
            })
        }
    })
})

router.get('/', (req, res) => {
    Ticket.find({})
        .then((data) => {
            console.log('Ticket Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', daerrorta)
        })
})
router.post('/saveTicket', (req, res) => {
    console.log('BODY: ', req.body)
    const data = req.body;
    const newTicket = new Ticket(data);
    newTicket.save((error) => {
        if (error) {
            console.log(error)
            res.status(500).json({ msg: 'Sorry, internal server error' });
        } else {
            res.json({
                msg: 'Your data was saved!!!'
            })
        }
    })
})
module.exports = router;