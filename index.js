const express = require('express')
const path = require('path')
const db = require('./models')
const apiRoutes = require('./routes/apiRoutes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

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
