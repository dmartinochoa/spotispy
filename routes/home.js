const express = require("express")
const router = express.Router()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')({
    dest: 'public/uploads/profile_images'
})

const geo_dao = require('../models/geo_dao.js')
const user_dao = require('../models/user_dao.js')
const { use } = require("./login.js")

router.get('/', async function(request, response) {
    const user = request.session.username
    if (request.session.loggedin) {
        response.render('../views/home.ejs', { username: user })
    } else {
        response.send('Please login to view this page!')
    }
    response.end()
})

router.get('/logged', async function(request, response) {
    const user = request.session.username
    if (request.session.loggedin) {
        const token = request.session.token
        const refresh_token = request.session.refresh_token
        console.log("🚀 ~ file: home.js ~ line 23 ~ router.get ~ token", token)
        response.render('../public/index.ejs', {
            data: { username: user, token: token, refresh_token: refresh_token }
        })
    } else {
        response.send('Please login to view this page!')
    }
    response.end()
})

router.post('/logout', async function(request, response) {
    response.render('../views/index.ejs', { name: 'logged out' })
})

router.post('/upload', [multer.single('attachment')], async function(req, res, next) {
    console.log('sup')
    var { fileName } = storeWithOriginalName(req.file)
})

function storeWithOriginalName(file) {
    var fullNewPath = path.join(file.destination, file.originalname)
    fs.renameSync(file.path, fullNewPath)
    return {
        fileName: file.originalname
    }
}

router.post('/search', async function(request, response) {
    console.log(request.body)
    let username = request.session.username
    if (typeof(username != 'undefined')) {
        let id_user = await user_dao.get_id_by_user(request, username)
        geo_dao.insert_pos(request, id_user, username.trim(), request.body.genre.trim(), request.body.artist.trim(), request.body.lat, request.body.long)
        let user_map = await geo_dao.get_users_by_pos_track(request, id_user, username.trim(), request.body.genre.trim(), request.body.artist.trim(), request.body.lat, request.body.long)
        map_object = Object.fromEntries(user_map)
        console.log(map_object)
        response.send(map_object)
    }
})

router.post('/search_nearby', async function(request, response) {
    console.log(request.body)
    let username = request.session.username
    if (typeof(username != 'undefined')) {
        let id_user = await user_dao.get_id_by_user(request, username)
        let user_map = await geo_dao.get_users_nearby(request, id_user, username.trim(), request.body.lat, request.body.long)
        map_object = Object.fromEntries(user_map)
        console.log(map_object)
        response.send(map_object)
    }
})

module.exports = router