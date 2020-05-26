const router = require('express').Router()
const db = require('../models')

const response = (statusCode, data = null) => ({
    statusCode: statusCode,
    data: data,
})

router.post('/company/get', (req, res) => {
    db.company
        .findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 5,
        })
        .then((data) => {
            res.send(response(200, data))
        })
})

module.exports = router
