const router = require('express').Router()
const Sequelize = require('sequelize')
const db = require('../models')
const JWT = require('jsonwebtoken')
const { SECRET } = require('../config/jwt-secret')
const { response, isNumber } = require('../common/routeMiddleware')

const protectedRoute = (req, res, callback) => {
    const token = req.session.user_token

    JWT.verify(token, SECRET, (err, decoded) => {
        if (!decoded) {
            return res.send(response(401))
        }

        db.users
            .findByPk(decoded.id)
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
        const { offset, limit } = req.body

        if (!isNumber(offset, limit)) {
            return res.send(response(400))
        }

        db.users
            .findAll({
                offset: parseInt(offset),
                limit: parseInt(limit),
                attributes: ['id', 'name', 'isBlocked', 'isAdmin', 'createdAt', 'updatedAt'],
            })
            .then((users) => {
                res.send(response(200, users))
            })
    })
})

router.post('/admins/add', (req, res) => {
    protectedRoute(req, res, () => {
        const { ids } = req.body

        if (!isNumber(...ids)) {
            return res.send(response(400))
        }

        db.users
            .update(
                { isAdmin: true },
                {
                    where: {
                        id: {
                            [Sequelize.Op.or]: ids,
                        },
                    },
                }
            )
            .then(([rowsUpdated]) => {
                res.send(response(200, rowsUpdated))
            })
    })
})

router.post('/admins/delete', (req, res) => {
    protectedRoute(req, res, () => {
        const { ids } = req.body

        if (!isNumber(...ids)) {
            return res.send(response(400))
        }

        db.users
            .update(
                { isAdmin: false },
                {
                    where: {
                        id: {
                            [Sequelize.Op.or]: ids,
                        },
                    },
                }
            )
            .then(([rowsUpdated]) => {
                res.send(response(200, rowsUpdated))
            })
    })
})

router.post('/users/block', (req, res) => {
    protectedRoute(req, res, () => {
        const { ids } = req.body

        if (!isNumber(...ids)) {
            return res.send(response(400))
        }

        db.users
            .update(
                { isBlocked: true },
                {
                    where: {
                        id: {
                            [Sequelize.Op.or]: ids,
                        },
                    },
                }
            )
            .then(([rowsUpdated]) => {
                res.send(response(200, rowsUpdated))
            })
    })
})

router.post('/users/unblock', (req, res) => {
    protectedRoute(req, res, () => {
        const { ids } = req.body

        if (!isNumber(...ids)) {
            return res.send(response(400))
        }

        db.users
            .update(
                { isBlocked: false },
                {
                    where: {
                        id: {
                            [Sequelize.Op.or]: ids,
                        },
                    },
                }
            )
            .then(([rowsUpdated]) => {
                res.send(response(200, rowsUpdated))
            })
    })
})

router.post('/users/delete', (req, res) => {
    protectedRoute(req, res, () => {
        const { ids } = req.body

        if (!isNumber(...ids)) {
            return res.send(response(400))
        }

        db.users
            .destroy({
                where: {
                    id: {
                        [Sequelize.Op.or]: ids,
                    },
                },
            })
            .then(() => {
                res.send(response(200))
            })
    })
})

module.exports = router
