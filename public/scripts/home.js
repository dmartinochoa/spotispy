var server_data = document.getElementById('data').innerHTML
var token = server_data.token
var refresh_token = server_data.refresh_token
var track_list = document.getElementById("tracks")
var track_single = document.querySelector("track")
var album_list = document.getElementById("albums")
var artist_list = document.getElementById("artists")
var music_widget = document.getElementById("widgetPlayer")
var devices = document.getElementById("devices")
var btn_play = document.querySelector("#play_pause")
var pause_ico = document.querySelector("#pause")
var play_ico = document.querySelector("#play")
var next_ico = document.querySelector(".ion-ios-skipforward")
var previous_ico = document.querySelector(".ion-ios-skipbackward")
var volume_input = document.getElementById("volume_input")
var friends_ico = document.querySelector(".ion-person-stalker")
var notification_ico = document.querySelector(".ion-android-notifications")
var radio_ico = document.querySelector(".ion-radio-waves")
var nearby_list = document.querySelector("#nearby_list")


var new_device
var isPlaying = false;

var search_bar = document.getElementById("searchbar")
search_bar.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        searchAll(search_bar.value)
    }
})

function change_volume() {
    var x = volume_input.value;

    if (!isNaN(x) && x.length > 0) {
        if (x > 100) {
            x = 100
        } else if (x < 0) {
            x = 0
        }
        console.log("Volume %: " + x);
        set_volume(x)
    } else {
        console.log("Volume NaN")
    }
}

async function searchAll(input) {
    let resCallback, rejCallback
    const returnPromise = new Promise((resolve, reject) => {
        resCallback = resolve
        refCallback = reject
    })

    const type = '&type=track%2Cartist%2Calbum'
    const res = await fetch('https://api.spotify.com/v1/search?q=' + input + type + '&market=NA&limit=15', {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    const content = await res.json();
    console.log("🚀 ~ file: search.js ~ line 26 ~ searchAll ~ content", content)
    await showTracks(content.tracks)
    showAlbums(content.albums)
    showArtists(content.artists)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////SHOW IN VIEW/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function showTracks(tracks) {
    var track_html = '<div class="section-title"><big>Songs</big></div> <div class="tracks">'
    for (let i = 0; i < tracks.items.length; i++) {
        const track = tracks.items[i]
        const duration = millisToMinutesAndSeconds(track.duration_ms)
        var explicit = ''
        var img_url = 'none found'
        var uri = track.album.uri
        var uri_short = track.uri.substring(14)
        var position = track.track_number - 1
        var genre = await get_genre_by_artist_id(track.artists[0].id)

        if (track.explicit) {
            explicit = '<span class="label" data-id=' + uri + '>Explicit</span>'
        }
        if (track.album.images[0]) {
            img_url = track.album.images[0].url
        }
        track_html += ' <div class="track" id=track data-id=' + uri + '  data-position=' + position + ' data-genre=' + genre + '> <div class="track__art" > <img src="' + img_url + '" data-id=' + uri + '  data-genre=' + genre + '  data-position=' + position + ' alt="Img not found"/> </div>' +
            '<div class="track__title track" data-id=' + uri + '  data-genre=' + genre + ' data-position=' + position + ' " data-id=' + uri + '> ' + track.name + '<div style="color:grey;" data-id=' + uri +
            ' data-position=' + position + '  data-genre=' + genre + '> <small class="track__artist" id=' + uri + ' data-id=' + uri + '  data-genre=' + genre + ' data-position=' + position + ' style="padding-left:5px;">' + track.artists[0].name +
            '</small></div> </div> <div class="track__explicit">' + explicit + '  </div> <div class="track__plays" data-id=' + uri + '  data-genre=' + genre + '  data-position=' + position + '>' + duration + '</div></div>'
    }
    track_list.innerHTML = track_html
}

function showAlbums(albums) {
    var album_html = ' <div class="overview__albums__head"> <span class="section-title"><big>Albums</big></span> </div>'
    for (let i = 0; i < albums.items.length - 10; i++) {
        const album = albums.items[i];
        const release_year = album.release_date.substring(0, 4)
        var uri = album.uri.substring(14)

        album_html +=
            '<div class="album__info" id=album data-id=' + uri + '> <div class="album__info__art"  data-id=' + uri + '> <img src="' + album.images[0].url +
            '" alt="None found"  data-id=' + uri + '/> </div> <div class="album__info__meta"  data-id=' + uri + '> <div class="album__year"  data-id=' + uri + '>' + release_year + '</div> ' +
            '<div class="album__name"  data-id=' + uri + '> <span  data-id=' + uri + '>' + album.name + ' - ' + album.artists[0].name + '</span> </div> <div class="album__actions" data-id=' + uri + '> <button class="button-light save" data-id=' + uri + '>Save</button>' +
            ' <button class="button-light more" data-id=' + uri + '> <i class="ion-ios-more" data-id=' + uri + '></i> </button> </div> </div> </div>'
    }
    album_list.innerHTML = album_html
}

function showArtists(artists) {
    var artist_html = '<div class="overview__albums__head" style="width: 100%;"> <span class="section-title"><big>Artists</big></span> </div>'
    var img_url = ''
    for (let i = 0; i < artists.items.length - 3; i++) {
        const artist = artists.items[i];
        const artist_type = artist.type.charAt(0).toUpperCase() + artist.type.slice(1)
        if (artist.images[0]) {
            img_url = artist.images[0].url
        }
        var uri = artist.uri.substring(15)

        artist_html += '<div class="media-card" id=artist data-id=' + uri + '> <div class="media-card__image" data-id=' + uri + ' style="background-image: url(' + img_url + ');">' +
            ' <i class="ion-ios-play" data-id=' + uri + '></i> </div> <a class="media-card__footer" data-id=' + uri + '>' + artist.name + ' <div style="color:grey;"  data-id=' +
            uri + '> <small  data-id=' + uri + '> ' + artist_type + ' </small></div></a> </div></div>'
    }
    artist_list.innerHTML = artist_html
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////ON CLICK/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

track_list.onclick = function(event) {
    let target = event.target
    var track_name = document.getElementsByClassName("track__title")
    var track_artist = document.getElementsByClassName("track__artist")
    for (var i = 0; i < track_artist.length; i++) {
        track_artist[i].style.color = 'Gray';
    }
    for (var i = 0; i < track_name.length; i++) {
        track_name[i].style.color = 'White';
    }
    event.target.style.color = "#1DB954";
    const uri = target.getAttribute('data-id')
    const position = target.getAttribute('data-position')
    const genre = target.getAttribute('data-genre')
    const artist_name = document.getElementById(uri).innerHTML

    play_uri(uri, position)
    insert_position(artist_name, genre);

    isPlaying = true;
    play_ico.style.display = "none";
    pause_ico.style.display = "block"
}

album_list.onclick = function(event) {
    let target = event.target
    const uri = target.getAttribute('data-id')
    music_widget.innerHTML = '<iframe src="https://open.spotify.com/embed/album/' + uri + '" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
}

artist_list.onclick = function(event) {
    let target = event.target
    const uri = target.getAttribute('data-id')
    music_widget.innerHTML = '<iframe src="https://open.spotify.com/embed/artist/' + uri + '" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
}

btn_play.onclick = function(event) {
    play_pause()
}

next_ico.onclick = function(event) {
    next_track()
}

previous_ico.onclick = function(event) {
    previous_track()
}

// TOPBAR 
radio_ico.onclick = function(event) {
    nearby_users()
}
friends_ico.onclick = function(event) {

}
notification_ico.onclick = function(event) {

}