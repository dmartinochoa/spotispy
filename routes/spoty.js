const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')
const querystring = require('querystring')
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node')

const client_id = process.env.CLIENT_ID


const client_secret = process.env.CLIENT_SECRET
const redirect_uri = 'https://localhost:3000/spoty/callback' // Must be the same as in spotify developers project settings
var stateKey = 'spotify_auth_state'

router.use(bodyParser.urlencoded({ extended: false }))

var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
})

// Redirects user to spoty authentification website
router.get('/', function(req, res) {
    var state = generateRandomString(16)
    res.cookie(stateKey, state)

    // your application requests authorization
    var scope = 'user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state user-read-currently-playing'
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }))
})

/* Handle authorization callback from Spotify */
router.get('/callback', function(req, res) {
    var code = req.query.code // Read the authorization code from the query parameters
    var state = req.query.state // (Optional) Read the state from the query parameter

    spotifyApi.authorizationCodeGrant(code)
        .then(function(data) {
                console.log('The token expires in ' + data.body.expires_in)
                console.log('The access token is ' + data.body.access_token)
                console.log('The refresh token is ' + data.body.refresh_token)

                req.session.token = data.body.access_token
                req.session.refresh_token = data.body.refresh_token
                    /* Redirecting back to the main page! :-) */
                res.redirect('/home/logged')
            },
            function(err) {
                res.status(err.code)
                res.send(err.message)
            })

})

router.post('/search', (request, response) => {
    spotdifyApi.setAccessToken(access_token)
    const song_name = request.body.song_name

    spotifyApi.searchTracks(song_name)
        .then(function(data) {
            console.log('Search by ' + song_name, data.body)
        }, function(err) {
            console.error(err)
        })
})

var generateRandomString = function(length) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}



module.exports = router