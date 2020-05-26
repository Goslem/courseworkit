const router = require('express').Router()
const Sequelize = require('sequelize')
const db = require('../models')
const JWT = require('jsonwebtoken')
const { SECRET } = require('../config/jwt-secret')

const response = (statusCode, data = null) => ({
    statusCode: statusCode,
    data: data,
})

const protectedRoute = (req, res, callback) => {
    const token = req.session.user_token

    JWT.verify(token, SECRET, (err, decoded) => {
        if (!decoded) {
            return res.send(response(401))
        }

        db.users.findByPk(decoded.id)
            .then(({ id, isBlocked, isAdmin }) => {
                if (id === null || isBlocked === true || isAdmin === false) {
                    return res.send(response(403))
                }

                callback()
            })
            .catch((error) => {
                return res.send(response(403))
            })
    })
}

router.get('/users/count', (req, res) => {
    protectedRoute(req, res, () => {
        db.users.count().then((count) => {
            res.send(response(200, count))
        })
    })
})

router.post('/users/get', (req, res) => {
    protectedRoute(req, res, () => {
        db.users.findAll({
            offset: req.body.offset,
            limit: req.body.limit,
            attributes: ['id', 'name', 'isBlocked', 'isAdmin', 'createdAt', 'updatedAt'],
        }).then((users) => {
            res.send(response(200, users))
        })
    })
})

router.post('/admins/add', (req, res) => {
    protectedRoute(req, res, () => {
        db.users.update(
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
})

router.post('/admins/delete', (req, res) => {
    protectedRoute(req, res, () => {
        db.users.update(
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
})

router.post('/users/block', (req, res) => {
    protectedRoute(req, res, () => {
        db.users.update(
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
})

router.post('/users/unblock', (req, res) => {
    protectedRoute(req, res, () => {
        db.users.update(
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
})

router.post('/users/delete', (req, res) => {
    protectedRoute(req, res, () => {
        db.users.destroy({
            where: {
                id: {
                    [Sequelize.Op.or]: req.body.ids,
                },
            },
        }).then(() => {
            res.send(response(200))
        })
    })
})

module.exports = router
