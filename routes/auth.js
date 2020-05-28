const router = require('express').Router()
const db = require('../models')
const JWT = require('jsonwebtoken')
const { SECRET } = require('../config/jwt-secret')
const { response, isNumber, isEmptyString } = require('../common/routeMiddleware')

const createJWTCookie = (req, id) => {
    const payload = { id }
    const token = JWT.sign(payload, SECRET)
    req.session.user_token = token
}

router.post('/login', (req, res) => {
    const { login, password } = req.body

    if (isEmptyString(login, password)) {
        return res.send(response(400))
    }

    db.users
        .findOne({
            where: { login, password },
            attributes: ['id', 'isBlocked', 'isAdmin'],
        })
        .then((user) => {
            if (user === null) {
                return res.send(response(204))
            }

            if (user.isBlocked === true) {
                return res.send(response(403))
            }

            createJWTCookie(req, user.id)
            res.send(response(200, user))
        })
})

router.post('/registration', (req, res) => {
    const { login, password } = req.body

    if (isEmptyString(login, password)) {
        return res.send(response(400))
    }

    db.users
        .findOrCreate({
            where: { login },
            defaults: {
                login,
                password,
                socialId: null,
                isBlocked: false,
                isAdmin: false,
                name: 'anonymous',
                surname: 'anonymous',
                country: 'Belarus',
                city: 'Minsk',
            },
        })
        .then(([{ id }, created]) => {
            if (created === false) {
                return res.send(response(204))
            }

            createJWTCookie(req, id)
            res.send(response(200, { id }))
        })
})

router.post('/socialLogin', (req, res) => {
    const { socialId, name } = req.body

    if (!isNumber(socialId)) {
        return res.send(response(400))
    }

    if (isEmptyString(name)) {
        return res.send(response(400))
    }

    db.users
        .findOrCreate({
            where: { socialId },
            defaults: {
                login: null,
                password: null,
                socialId,
                isBlocked: false,
                isAdmin: false,
                name,
                surname: 'anonymous',
                country: 'Belarus',
                city: 'Minsk',
            },
        })
        .then(([{ id, isBlocked, isAdmin }]) => {
            if (isBlocked === true) {
                return res.send(response(403))
            }

            createJWTCookie(req, id)
            res.send(response(200, { id, isAdmin }))
        })
})

router.post('/me', (req, res) => {
    const token = req.session.user_token

    JWT.verify(token, SECRET, (err, decoded) => {
        if (!decoded) {
            return res.send(response(401))
        }

        db.users
            .findByPk(decoded.id)
            .then(({ id, isBlocked, isAdmin }) => {
                if (id === null || isBlocked === true) {
                    return res.send(response(403))
                }

                res.send(response(200, { id, isAdmin }))
            })
            .catch((error) => {
                return res.send(response(401))
            })
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send(response(500))
        }
        res.send(response(200))
    })
})

module.exports = router
