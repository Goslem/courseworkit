const router = require('express').Router()
const db = require('../models')

const response = (statusCode, data = null) => ({
    statusCode: statusCode,
    data: data,
})

const checkRequestValues = (field1, field2 = 1, field3 = 1) => {
    const field1After = Math.abs(parseInt(field1, 10))
    const field2After = Math.abs(parseInt(field2, 10))
    const field3After = Math.abs(parseInt(field3, 10))
    if (!field1After || isNaN(field2After) || !field3After) return 400
    if (field1After > 9999999 || field2After > 9999999 || field3After > 9999999) {
        return 413
    }
}

// NEED UPDATE
router.post('/bonuses/count', (req, res) => {
    const error = checkRequestValues(req.body.userId)
    if (error) return res.send(error)

    db.Bonuses.count({
        include: {
            model: db.Users,
            where: { id: req.body.userId },
            attributes: [],
            required: true,
        },
    }).then((count) => {
        res.send(response(200, count))
    })
})

// NEED FIX
router.post('/bonuses/get', (req, res) => {
    const error = checkRequestValues(req.body.userId, req.body.offset, req.body.limit)
    if (error) return res.send(error)

    const offset = Math.abs(parseInt(req.body.offset))
    const limit = Math.abs(parseInt(req.body.limit))

    db.Bonuses.findAll({
        include: {
            model: db.Users,
            where: { id: req.body.userId },
            attributes: [],
            required: true,
        },
        offset: offset,
        limit: limit,
        attributes: ['id', 'title', 'amount', 'description'],
    }).then((bonuses) => {
        res.send(response(200, bonuses))
    })
})

router.post('/company/count', (req, res) => {
    const error = checkRequestValues(req.body.userId)
    if (error) return res.send(error)

    db.Company.count({
        where: { UserId: req.body.userId },
    }).then((count) => {
        res.send(response(200, count))
    })
})

router.post('/company/get', (req, res) => {
    const error = checkRequestValues(req.body.userId, req.body.offset, req.body.limit)
    if (error) return res.send(error)

    const offset = Math.abs(parseInt(req.body.offset))
    const limit = Math.abs(parseInt(req.body.limit))

    db.Company.findAll({
        offset: offset,
        limit: limit,
        where: { UserId: req.body.userId },
        attributes: ['id', 'title', 'currentAmount', 'targetAmount', 'expirationDate'],
    }).then((bonuses) => {
        res.send(response(200, bonuses))
    })
})

router.post('/user/get', (req, res) => {
    const error = checkRequestValues(req.body.userId)
    if (error) return res.send(error)

    db.Users.findByPk(req.body.userId)
        .then(({ id, name, surname, country, city }) => {
            if (id === null) {
                return res.send(response(403))
            }

            res.send(response(200, { name, surname, country, city }))
        })
        .catch((error) => {
            return res.send(response(401))
        })
})

module.exports = router
