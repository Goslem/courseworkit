const router = require('express').Router()
const db = require('../models')
const { response, isNumber, isEmptyString } = require('../common/routeMiddleware')

router.post('/bonuses/count', (req, res) => {
    const { userId } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    db.bonuses
        .count({
            include: {
                model: db.users,
                where: { id: userId },
                attributes: [],
                required: true,
            },
        })
        .then((count) => {
            res.send(response(200, count))
        })
})

router.post('/bonuses/get', (req, res) => {
    const { userId, offset, limit } = req.body

    if (!isNumber(userId, offset, limit)) {
        return res.send(response(400))
    }

    db.bonuses
        .findAll({
            include: {
                model: db.users,
                where: { id: userId },
                attributes: [],
                required: true,
            },
            offset: parseInt(offset),
            limit: parseInt(limit),
            attributes: ['id', 'title', 'amount', 'description'],
        })
        .then((bonuses) => {
            res.send(response(200, bonuses))
        })
})

router.post('/company/count', (req, res) => {
    const { userId } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    db.company
        .count({
            where: { userId },
        })
        .then((count) => {
            res.send(response(200, count))
        })
})

router.post('/company/get', (req, res) => {
    const { userId, offset, limit } = req.body

    if (!isNumber(userId, offset, limit)) {
        return res.send(response(400))
    }

    db.company
        .findAll({
            offset: parseInt(offset),
            limit: parseInt(limit),
            where: { userId },
            attributes: ['id', 'title', 'currentAmount', 'targetAmount', 'expirationDate'],
        })
        .then((bonuses) => {
            res.send(response(200, bonuses))
        })
})

router.post('/user/get', (req, res) => {
    const { userId } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    db.users
        .findByPk(userId)
        .then(({ name, surname, country, city }) => {
            if (name === null) {
                return res.send(response(403))
            }

            res.send(response(200, { name, surname, country, city }))
        })
        .catch((error) => {
            return res.send(response(401))
        })
})

router.post('/user/set/name', (req, res) => {
    const { userId, name } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    if (isEmptyString(name)) {
        return res.send(response(400))
    }

    db.users
        .update(
            { name: name },
            {
                where: { id: userId },
            }
        )
        .then(() => {
            res.send(response(200))
        })
})

router.post('/user/set/surname', (req, res) => {
    const { userId, surname } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    if (isEmptyString(surname)) {
        return res.send(response(400))
    }

    db.users
        .update(
            { surname: surname },
            {
                where: { id: userId },
            }
        )
        .then(() => {
            res.send(response(200))
        })
})

router.post('/user/set/country', (req, res) => {
    const { userId, country } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    if (isEmptyString(country)) {
        return res.send(response(400))
    }

    db.users
        .update(
            { country: country },
            {
                where: { id: userId },
            }
        )
        .then(() => {
            res.send(response(200))
        })
})

router.post('/user/set/city', (req, res) => {
    const { userId, city } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    if (isEmptyString(city)) {
        return res.send(response(400))
    }

    db.users
        .update(
            { city: city },
            {
                where: { id: userId },
            }
        )
        .then(() => {
            res.send(response(200))
        })
})

module.exports = router
