const express = require('express')
const cors = require('cors')
const app = express()
const port = 4004
const bp = require('body-parser')
const cp = require('cookie-parser')
const session = require('express-session')
const sessionStore = require('express-mysql-session')(session)

const storeRequest = require('./router/storeRequest')
const addStore = require('./router/addStore')
const editStore = require('./router/editStore')
const deleteStore = require('./router/deleteStore')
const editPersonnel = require('./router/editPersonnel')
const login_process = require('./router/login_process')
const singUp_process = require('./router/signUp_process')
const addReview = require('./router/addReview')
const reviewRequest = require('./router/reviewRequest')
const sorter = require('./router/sorter')
const errorLogger = require('./router/errorLogger')
const imgUpload = require('./router/imgUpload')
const eachStoreRequest = require('./router/eachStoreRequest')

app.use(express.json())
app.set('views', __dirname + '/public')
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)
app.use(bp.urlencoded({ limit: '1gb', extended: false }))
app.use(bp.json())
app.disable('etag')
app.use(cp())
app.use(cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
}))

app.use(session({
    key: "loginData",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store:new sessionStore({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "#koldin13579",
        database: "tableEyes"
    }),
    cookie: { maxAge: 600000000, secure: false }
}))

app.use(express.static(__dirname + '/public'))

app.use(errorLogger)

app.get('/store/type/:type?/id/:id?/category/:category?', storeRequest)
app.get('/review/:storeId', reviewRequest)
app.get("/each-store/:id", eachStoreRequest)

app.put('/store/:id', editStore)

app.patch('/store/personnel/:id/:count', editPersonnel)

app.delete('/store/:id', deleteStore)

app.post('/store', addStore)
app.post('/login', login_process)
app.post('/sign-up', singUp_process)
app.post('/review/:storeId', addReview)
app.post('/sort/:mode', sorter)
app.post('/img-upload', imgUpload)

app.get('*', (req, res) => res.status(404).json({ massage:"Not Found Page" }))

app.listen(port, () => console.log(`server is running on port ${port}`))