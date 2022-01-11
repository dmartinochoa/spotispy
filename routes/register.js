const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')
const crypto = require('crypto-js')
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', async(request, response) => {
    response.render('../views/register.ejs')
})

router.post('/', async(request, response) => {
    try {
        const pool = request.app.get('connection')
        const username = request.body.username
        const password = request.body.password
        const enc_password = crypto.HmacSHA1(password, 'key').toString()
        const email = request.body.email
        console.log(username, password, email, enc_password)

        const sql = 'INSERT INTO accounts(username, password, email) VALUES ($1, $2, $3)'
        const values = [username, enc_password, email]
        const results = await pool.query(sql, values)
        console.log("User Registered")
        response.redirect('/')
            //MOVE TO USER DAO

    } catch (error) {
        console.log(error)
        response.redirect('/register')
    }
})

module.exports = router