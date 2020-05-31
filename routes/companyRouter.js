const router = require('express').Router()
const db = require('../models')
const { response, isNumber, isEmptyString } = require('../common/routeMiddleware')

router.post('/userCompanies/getId', (req, res) => {
    const { userId } = req.body

    if (!isNumber(userId)) {
        return res.send(response(400))
    }

    db.company
        .findAll({
            where: { userId },
            attributes: ['id'],
        })
        .then((userCompanies) => {
            res.send(response(200, userCompanies))
        })
})

router.post('/company/get', (req, res) => {
    const { companyId } = req.body

    if (!isNumber(companyId)) {
        return res.send(response(400))
    }

    db.company
        .findOne({
            where: { id: companyId },
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
    const { companyId } = req.body

    if (!isNumber(companyId)) {
        return res.send(response(400))
    }

    db.bonuses
        .count({
            where: { companyId },
        })
        .then((count) => {
            res.send(response(200, count))
        })
})

router.post('/bonuses/get', (req, res) => {
    const { companyId, offset, limit } = req.body

    if (!isNumber(companyId, offset, limit)) {
        return res.send(response(400))
    }

    db.bonuses
        .findAll({
            where: { companyId },
            offset: parseInt(offset),
            limit: parseInt(limit),
            attributes: ['id', 'title', 'amount', 'description'],
        })
        .then((bonuses) => {
            res.send(response(200, bonuses))
        })
})

router.post('/bonuses/buy', (req, res) => {
    const { userId, bonusId, bonusAmount, companyId } = req.body

    if (!isNumber(userId, bonusId, bonusAmount, companyId)) {
        return res.send(response(400))
    }

    db.users.findOne({ where: { id: userId } }).then((user) => {
        if (!user) return res.send(response(204))

        db.bonuses.findOne({ where: { id: bonusId } }).then((bonus) => {
            if (!bonus) return res.send(response(204))

            user.addBonuses(bonus, {
                through: { bonuseId: bonusId, userId },
            })

            db.company
                .update(
                    { currentAmount: db.sequelize.literal(`currentAmount + ${bonusAmount}`) },
                    { where: { id: companyId } }
                )
                .then(() => {
                    res.send(response(200))
                })
        })
    })
})

router.post('/create', (req, res) => {
    const { title, description, videoLink, expirationDate, targetAmount, userId } = req.body

    if (isEmptyString(title, description, videoLink, expirationDate)) {
        return res.send(response(400))
    }

    if (!isNumber(targetAmount, userId)) {
        return res.send(response(400))
    }

    db.company
        .create({
            title,
            description,
            videoLink,
            currentAmount: 0,
            targetAmount,
            expirationDate,
            userId,
        })
        .then(({ id }) => {
            res.send(response(200, { id }))
        })
})

router.post('/images/set', (req, res) => {
    const { companyId, images } = req.body

    if (isEmptyString(...images)) {
        return res.send(response(400))
    }

    if (!isNumber(companyId)) {
        return res.send(response(400))
    }

    const condition = images.map((image) => ({ src: image, companyId }))

    db.companyImages.bulkCreate(condition).then(() => {
        res.send(response(200))
    })
})

router.post('/images/get', (req, res) => {
    const { companyId } = req.body

    if (!isNumber(companyId)) {
        return res.send(response(400))
    }

    db.companyImages
        .findAll({
            where: {
                companyId: companyId,
            },
            attributes: ['src'],
        })
        .then((images) => {
            res.send(response(200, images))
        })
})

module.exports = router
