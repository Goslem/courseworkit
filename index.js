const express = require('express')
const app = express()
const path = require('path')
const db = require('./models')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const apiRoutes = require('./routes/apiRoutes')
app.use('/api', apiRoutes)

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 5000

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})
