const express = require('express')
const router = express.Router()
const db = require('../models')

router.post('/auth/login', (req, res) => {
    db.Users.findAll({
        where: {
            login: req.body.login,
            password: req.body.password,
        },
    }).then((user) => res.send(user))
})

router.post('/auth/logout', (req, res) => {
    res.send('deleted')
})

router.post('/auth/registration', (req, res) => {
    db.Users.create({
        login: req.body.login,
        password: req.body.password,
    }).then((submittedUser) => res.send(submittedUser))
})

router.get('/auth/me', (req, res) => {
    setTimeout(() => {
        res.send('get')
    }, 3000)
})

module.exports = router
