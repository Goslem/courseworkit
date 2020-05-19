const express = require('express')
const router = express.Router()
const db = require('../models')
const JWT = require('jsonwebtoken')
const SECRET = 'hssssss'

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

        const payload = { id: user.id }
        const token = JWT.sign(payload, SECRET)

        res.cookie('access_token', token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            // secure: true,
        })

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
            const payload = { id: submittedUser.id }
            const token = JWT.sign(payload, SECRET)

            res.cookie('access_token', token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                // secure: true,
            })

            res.send(submittedUser)
        })
    })
})

router.post('/auth/me', (req, res) => {
    const token = req.cookies.access_token

    try {
        const decoded = JWT.verify(token, SECRET)

        db.Users.findOne({
            where: {
                id: decoded.id,
            },
        }).then((user) => {
            if (user === null) {
                return res.status(204).end()
            }

            res.send(user)
        })
    } catch (err) {
        return res.status(204).end()
    }
})

router.post('/auth/logout', (req, res) => {
    res.send('deleted')
})

module.exports = router
