const router = require('express').Router()
const db = require('../models')
const JWT = require('jsonwebtoken')
const { SECRET } = require('../config/jwt-secret')

const response = (statusCode, data = null) => ({
    statusCode: statusCode,
    data: data,
})

const createJWTCookie = (req, id) => {
    const payload = { id: id }
    const token = JWT.sign(payload, SECRET)
    req.session.user_token = token
}

const checkRequestValues = (field1, field2, field1Length = 20, field2Length = 20) => {
    if (!field1 || !field2) {
        return response(400)
    }
    if (field1.length > field1Length || field2.length > field2Length) {
        return response(413)
    }
}

router.post('/login', (req, res) => {
    const error = checkRequestValues(req.body.login, req.body.password)
    if (error) return res.send(error)

    db.users.findOne({
        where: {
            login: req.body.login,
            password: req.body.password,
        },
        attributes: ['id', 'isBlocked', 'isAdmin'],
    }).then((user) => {
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
    const error = checkRequestValues(req.body.login, req.body.password)
    if (error) return res.send(error)

    db.users.findOrCreate({
        where: {
            login: req.body.login,
        },
        defaults: {
            login: req.body.login,
            password: req.body.password,
            socialId: null,
            isBlocked: false,
            isAdmin: false,
            name: 'name',
            surname: 'surname',
            country: 'Belarus',
            city: 'Minsk',
        },
    }).then(([{ id }, created]) => {
        if (created === false) {
            return res.send(response(204))
        }

        createJWTCookie(req, id)
        res.send(response(200, { id }))
    })
})

router.post('/socialLogin', (req, res) => {
    const error = checkRequestValues(req.body.socialId, req.body.name, 40)
    if (error) return res.send(error)

    db.users.findOrCreate({
        where: {
            socialId: req.body.socialId,
        },
        defaults: {
            login: null,
            password: null,
            socialId: req.body.socialId,
            isBlocked: false,
            isAdmin: false,
            name: req.body.name,
            surname: 'surname',
            country: 'Belarus',
            city: 'Minsk',
        },
    }).then(([{ id, isBlocked, isAdmin }, created]) => {
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

        db.users.findByPk(decoded.id)
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
