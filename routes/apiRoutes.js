const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/users', (req, res) => {
    db.Users.findAll({
        where: {
            login: req.body.login || '',
            password: req.body.password || '',
        },
    }).then((user) => res.send(user))
})

router.post('/addUsers', (req, res) => {
    db.Users.create({
        login: req.body.login || '',
        password: req.body.password || '',
    }).then((user) => res.send(user))
})

module.exports = router
