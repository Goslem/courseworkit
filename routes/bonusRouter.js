const router = require('express').Router()
const db = require('../models')
const { response, isNumber, isEmptyString } = require('../common/routeMiddleware')

router.post('/companiesId/get', (req, res) => {
    const { userId } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    db.company
        .findAll({
            where: { userId },
            attributes: ['id', 'title'],
        })
        .then((userCompanyId) => {
            res.send(response(200, userCompanyId))
        })
})

router.post('/create', (req, res) => {
    const { title, description, amount, companyId } = req.body

    if (isEmptyString(title, description)) {
        return res.send(response(400))
    }

    if (!isNumber(amount, companyId)) {
        return res.send(response(400))
    }

    db.bonuses.create({ title, amount, description, companyId }).then(() => {
        res.send(response(200))
    })
})

module.exports = router
