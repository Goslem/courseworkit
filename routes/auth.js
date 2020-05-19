const router = require('express').Router()
const db = require('../models')
const JWT = require('jsonwebtoken')
const { SECRET } = require('../config/jwt-secret')

const checkRequestValues = (req) => {
    if (!req.body.login || !req.body.password) return 400
    if (req.body.login.length > 20 || req.body.password.length > 20) return 413
}

router.post('/login', (req, res) => {
    const error = checkRequestValues(req)
    if (error) return res.status(error).end()

    db.Users.findOne({
        where: {
            login: req.body.login,
            password: req.body.password,
        },
    }).then((user) => {
        if (user === null) return res.status(204).end()

        const payload = { id: user.id }
        const token = JWT.sign(payload, SECRET)

        req.session.access_token = token
        res.send(user)
    })
})

router.post('/registration', (req, res) => {
    const error = checkRequestValues(req)
    if (error) return res.status(error).end()

    db.Users.findOne({
        where: {
            login: req.body.login,
        },
    }).then((user) => {
        if (user !== null) return res.status(204).end()

        db.Users.create({
            login: req.body.login,
            password: req.body.password,
            isAdmin: false,
        }).then((submittedUser) => {
            if (user === null) return res.status(204).end()

            const payload = { id: submittedUser.id }
            const token = JWT.sign(payload, SECRET)

            req.session.access_token = token
            res.send(submittedUser)
        })
    })
})

router.post('/me', (req, res) => {
    const token = req.session.access_token

    JWT.verify(token, SECRET, (err, decoded) => {
        if (!decoded) {
            return res.status(204).end()
        }

        db.Users.findByPk(decoded.id).then((user) => {
            if (user === null) {
                return res.status(204).end()
            }
            res.send(user)
        })
    })
})

router.post('/logout', (req, res) => {
    res.send('deleted')
})

module.exports = router
