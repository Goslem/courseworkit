const router = require('express').Router()
const Sequelize = require('sequelize')
const db = require('../models')

const response = (statusCode, data = null) => ({
    statusCode: statusCode,
    data: data,
})

router.get('/users/count', (req, res) => {
    db.Users.count().then((count) => {
        res.send(response(200, count))
    })
})

router.post('/users/get', (req, res) => {
    db.Users.findAll({
        offset: req.body.offset,
        limit: req.body.limit,
    }).then((users) => {
        res.send(response(200, users))
    })
})

router.post('/admins', (req, res) => {
    db.Users.update(
        { isAdmin: true },
        {
            where: {
                id: {
                    [Sequelize.Op.or]: req.body.ids,
                },
            },
        }
    ).then(([rowsUpdated]) => {
        res.send(response(200, rowsUpdated))
    })
})

router.delete('/admins', (req, res) => {
    db.Users.update(
        { isAdmin: false },
        {
            where: {
                id: {
                    [Sequelize.Op.or]: req.body.ids,
                },
            },
        }
    ).then(([rowsUpdated]) => {
        res.send(response(200, rowsUpdated))
    })
})

router.post('/users/block', (req, res) => {
    db.Users.update(
        { isBlocked: true },
        {
            where: {
                id: {
                    [Sequelize.Op.or]: req.body.ids,
                },
            },
        }
    ).then(([rowsUpdated]) => {
        res.send(response(200, rowsUpdated))
    })
})

router.post('/users/unblock', (req, res) => {
    db.Users.update(
        { isBlocked: false },
        {
            where: {
                id: {
                    [Sequelize.Op.or]: req.body.ids,
                },
            },
        }
    ).then(([rowsUpdated]) => {
        res.send(response(200, rowsUpdated))
    })
})

router.post('/users/delete', (req, res) => {
    db.Users.destroy({
        where: {
            id: {
                [Sequelize.Op.or]: req.body.ids,
            },
        },
    }).then(() => {
        res.send(response(200))
    })
})

module.exports = router
