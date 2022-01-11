const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')
const crypto = require('crypto-js')

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', async function(request, response) {
    response.render('../views/login.ejs')
    response.end()
})

router.post('/auth', async(request, response) => {
    const username = request.body.username
    const password = request.body.password
    const pool = request.app.get('connection')
    const enc_password = crypto.HmacSHA1(password, 'key').toString()
    const sql = "SELECT password from accounts WHERE (username = $1 OR email = $2) AND password = $3"
    const values = [username, username, enc_password]
    if (username && password) {
        try {
            const results = await pool.query(sql, values)
            if (results.rows.length > 0) {
                console.log('Result password: ' + results.rows[0].password)

                console.log('Authentification succeded: ' + username + ' - ' + password + ' ' + enc_password)
                request.session.loggedin = true
                request.session.username = username
                response.redirect('/spoty')

            } else {
                console.log("Authentification failed: " + username + ' - ' + password + ' ' + enc_password)
                response.render('../views/login_wrong.ejs')
            }
            response.end()
        } catch (err) {
            console.log(err.stack)
        }

    } else {
        console.log("Authentification failed: Empty Fields")
        response.send('Please enter Username and Password!')
        response.end()
    }
})

module.exports = router