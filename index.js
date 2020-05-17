const express = require('express')
const path = require('path')
const app = express()
const apiRoutes = require('./routes/apiRoutes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', apiRoutes)

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log(`Server listening on port ${port}`)
