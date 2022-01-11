require('dotenv').config({ path: __dirname + '/config/session_config.env' })
const https = require('https')
const fs = require('fs')
const morgan = require('morgan')
const colors = require('colors') // Dont remove
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const Store = require('express-session').Store // Dont remove
const BetterMemoryStore = require(__dirname + '/models/memory.js')
const store = new BetterMemoryStore({ expires: -1, debug: true })
const bodyParser = require('body-parser')
const path = require('path')
const con = require('./models/db_connection')

// API Routes
const router_login = require('./routes/login.js')
const router_home = require('./routes/home.js')
const router_register = require('./routes/register.js')
const router_forgot = require('./routes/forgot.js')
const router_spoty = require('./routes/spoty.js')

// App Setup
var app = express() // Express includes sessions and handling HTTP requests
app.set('views', path.join(__dirname, 'views')) // view engine setup
app.set('view engine', 'ejs')
app.use(morgan(('[REQUEST: :date ] : :method -> :url - Status: :status - :response-time ms').green)) // set up the logger
app.use(flash())
app.use(session({ // Let Express know we'll be using some of its packages
    name: 'yep',
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    path: '/',
    secure: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000 //24 hours
}))
app.use(express.static(path.join(__dirname, 'public'))) //Public folder to serve static files
app.use(bodyParser.urlencoded({ extended: false })) //the bodyParser will extract the form data from our login.html
app.use(bodyParser.json())
app.set('connection', con) // To persist the mysql connection in the session

// Set controllers base url
app.use('/', router_login)
app.use('/home', router_home)
app.use('/register', router_register)
app.use('/forgot', router_forgot)
app.use('/spoty', router_spoty)

// Serves any 404 requests
app.all('*', function(request, response) {
    response.status(404).sendFile(path.join(__dirname + '/res/img/404.png'))
})

// Https server setup/start
const options = {
    key: fs.readFileSync('config/key.pem'),
    cert: fs.readFileSync('config/cert.pem')
}
var credentials = {
    key: options.key,
    cert: options.cert
}
const port = 3000
const httpsServer = https.createServer(credentials, app)

httpsServer.listen(port)
console.log('---------------------------------')
console.log('Server listening on port: ' + port + '...')
console.log('---------------------------------')