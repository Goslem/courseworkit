const express = require('express')
const router = express.Router()
const db = require('../models')

const checkRequest = (req) => {
    if (!req.body.login || !req.body.password) return 400
    if (req.body.login.length > 20 || req.body.password.length > 20) return 413
}

router.post('/auth/login', (req, res) => {
    const error = checkRequest(req)
    if (error) return res.status(error).end()

    db.Users.findOne({
        where: {
            login: req.body.login,
            password: req.body.password,
        },
    }).then((user) => {
        if (user === null) {
            return res.status(204).end()
        }
        res.send(user)
    })
})

router.post('/auth/registration', (req, res) => {
    const error = checkRequest(req)
    if (error) return res.status(error).end()

    db.Users.findOne({
        where: {
            login: req.body.login,
        },
    }).then((user) => {
        if (user !== null) {
            return res.status(204).end()
        }
        db.Users.create({
            login: req.body.login,
            password: req.body.password,
        }).then((submittedUser) => {
            res.send(submittedUser)
        })
    })
})

router.post('/auth/logout', (req, res) => {
    res.send('deleted')
})

router.get('/auth/me', (req, res) => {
    setTimeout(() => {
        res.send('get')
    }, 1000)
})

module.exports = router
