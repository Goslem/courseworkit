const router = require('express').Router()
const db = require('../models')

router.post('/get', (req, res) => {
    db.Users.findAll().then((users) => {
        res.send(users)
    })
})

module.exports = router