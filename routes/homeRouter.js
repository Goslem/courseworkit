const router = require('express').Router()
const db = require('../models')
const { response } = require('../common/routeMiddleware')

router.post('/company/get', (req, res) => {
    db.company
        .findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 5,
        })
        .then((companies) => {
            res.send(response(200, companies))
        })
})

module.exports = router
