const router = require('express').Router()
const db = require('../models')

const response = (statusCode, data = null) => ({
    statusCode: statusCode,
    data: data,
})

router.post('/companiesId/get', (req, res) => {
    const field1After = Math.abs(parseInt(req.body.userId, 10))
    if (isNaN(field1After)) res.send(response(400))

    db.company
        .findAll({
            where: {
                userId: req.body.userId,
            },
            attributes: ['id', 'title'],
        })
        .then((userCompanyId) => {
            res.send(response(200, userCompanyId))
        })
})

router.post('/create', (req, res) => {
    if (!req.body.title || !req.body.description) return res.send(response(400))

    const field1After = Math.abs(parseInt(req.body.amount, 10))
    const field2After = Math.abs(parseInt(req.body.companyId, 10))
    if (isNaN(field1After) || isNaN(field2After)) res.send(response(400))

    db.bonuses
        .create({
            title: req.body.title,
            amount: req.body.amount,
            description: req.body.description,
            companyId: req.body.companyId,
        })
        .then(() => {
            res.send(response(200))
        })
})

module.exports = router
