const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    res.send('get')
})

router.post('/users', (req, res) => {
    res.send(req.body.login + ' ' + req.body.password)
})

module.exports = router