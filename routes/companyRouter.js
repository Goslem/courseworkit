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
    if (isNaN(field1After) || isNaN(field2After) || !field3After) return 400
}

router.post('/userCompanyId/get', (req, res) => {
    const error = checkRequestValues(req.body.userId)
    if (error) return res.send(error)

    db.company
        .findAll({
            where: {
                UserId: req.body.userId,
            },
            attributes: ['id'],
        })
        .then((userCompanyId) => {
            res.send(response(200, userCompanyId))
        })
})

router.post('/company/get', (req, res) => {
    const error = checkRequestValues(req.body.companyId)
    if (error) return res.send(error)

    db.company
        .findOne({
            where: { id: req.body.companyId },
            attributes: [
                'title',
                'description',
                'videoLink',
                'currentAmount',
                'targetAmount',
                'expirationDate',
            ],
        })
        .then((company) => {
            res.send(response(200, company))
        })
})

router.post('/bonuses/count', (req, res) => {
    const error = checkRequestValues(req.body.companyId)
    if (error) return res.send(error)

    db.bonuses
        .count({
            where: {
                CompanyId: req.body.companyId,
            },
        })
        .then((count) => {
            res.send(response(200, count))
        })
})

router.post('/bonuses/get', (req, res) => {
    const error = checkRequestValues(req.body.companyId, req.body.offset, req.body.limit)
    if (error) return res.send(error)

    const offset = Math.abs(parseInt(req.body.offset))
    const limit = Math.abs(parseInt(req.body.limit))

    db.bonuses
        .findAll({
            where: { CompanyId: req.body.companyId },
            offset: offset,
            limit: limit,
            attributes: ['id', 'title', 'amount', 'description'],
        })
        .then((bonuses) => {
            res.send(response(200, bonuses))
        })
})

router.post('/bonuses/buy', (req, res) => {
    const error = checkRequestValues(req.body.bonusId, req.body.userId)
    if (error) return res.send(error)

    db.users.findOne({ where: { id: req.body.userId } }).then((user) => {
        if (!user) return res.send(response(204))

        db.bonuses.findOne({ where: { id: req.body.bonusId } }).then((bonus) => {
            if (!bonus) return res.send(response(204))

            user.addBonuses(bonus, {
                through: { bonuseId: req.body.bonusId, userId: req.body.userId },
            })

            res.send(response(200))
        })
    })
})

module.exports = router
