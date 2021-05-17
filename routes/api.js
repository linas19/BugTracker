const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js')

router.get('/', (req, res) => {
    Project.find({})
        .then((data) => {
            console.log('Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error', daerrorta)
        })
})
router.post('/save', (req, res) => {
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

module.exports = router;