const express = require("express")
const router = express.Router()
const gmail = require('../models/gmail.js')
const crypto = require('crypto-js')
const user_dao = require('../models/user_dao.js')

router.get('/', async function(request, response) {
    response.render('../views/forgot.ejs')
    response.end()
})

router.post('/', async function(request, response, connection) {
    const new_password = generate_password()
    const email = request.body.email
    const enc_password = crypto.HmacSHA1(new_password, 'key').toString()

    user_dao.set_password(request, email, enc_password)
    gmail.send_email(request, email.trim(), new_password)
    response.redirect('/')
    response.end()
})

function generate_password() {
    var result = []
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < 10; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)))
    }
    return result.join('')
}

module.exports = router