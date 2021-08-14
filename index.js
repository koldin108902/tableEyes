const express = require('express')
const app = express()
const port = 4004
const bp = require('body-parser')

const storeRequest = require('./router/storeRequest')
const addStore = require('./router/addStore')

app.set('views', __dirname + '/public')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)
app.post('*', bp.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('/index.html'))
app.get('/store/:type?', storeRequest)
app.post('/store', addStore)

app.get('*', (req, res) => res.status(404).send("NOT FOUND PAGE"))

app.listen(port, () => console.log(`server is running on port ${port}`))