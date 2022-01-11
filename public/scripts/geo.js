function insert_position(artist, genre) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var raw = JSON.stringify({
                "lat": position.coords.latitude,
                "long": position.coords.longitude,
                "genre": genre,
                "artist": artist
            })

            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }

            fetch("https://localhost:3000/home/search", requestOptions)
                .then(response => response.text())
                .then(result => show_nearby_related(JSON.parse(result)))
                .catch(error => console.log('error', error))
        })
    }
}

function nearby_users() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var raw = JSON.stringify({
                "lat": position.coords.latitude,
                "long": position.coords.longitude
            })

            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            }

            fetch("https://localhost:3000/home/search_nearby", requestOptions)
                .then(response => response.text())
                .then(result => show_nearby_unrelated(JSON.parse(result)))
                .catch(error => console.log('error', error))
        })
    }
}

function getLocation(callback) {
    if (navigator.geolocation) {
        var lat_lng = navigator.geolocation.getCurrentPosition(function(position) {
            var user_position = {}
            user_position.lat = position.coords.latitude
            user_position.lng = position.coords.longitude
            callback(user_position)
        })
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}

function show_nearby_related(result) {
    const map = new Map(Object.entries(result))
    let user_list = document.getElementById('friends')
    let user_string = ''

    map.forEach(function(value, key) {
        console.log(key + " = " + value.artist_list)
        let dist = Math.round(value.dist)
        let artist_list = value.artist_list.join(', ')
        let genre_list = value.genre_list.join(', ')
        let preview_artist = artist_list
        let preview_genre = genre_list
        if (artist_list.length >= 30) {
            preview_artist = artist_list.substring(0, 20) + '(...)'
        }
        if (genre_list.length >= 30) {
            preview_genre = genre_list.substring(0, 20) + '(...)'
        }
        preview_genre = capitalizeTheFirstLetterOfEachWord(preview_genre.replace(/-/g, " "))

        user_string += '<div style="padding-top:20px; float:left">' +
            '    <span class="user__info img"><img src="../favicon.ico" alt="Profile Picture" class="img-responsive" style="float:left; width:40%; padding-right:10px;border-radius: 50%;"></span> <span class="mybolder" id="mybold">' + value.username + ' </span> <span style="padding-left: 5px;"> <small id="mybold">' + dist + 'km away</small></span> <br>' +
            '<span id="mybold"> Artist/s In Common: </span> <br> <div style="padding-left: 5px;"><small id="mysmolbold">' + preview_artist + '</small> </div>' +
            '<span id="mybold"> Genre/s In Common: </span> <br> <div style="padding-left: 5px;"><small id="mysmolbold">' + preview_genre + '</small> </div> </div> <hr class="new1">'
    })
    if (user_string == '') {
        user_string += ' <span id="mybold" style="text-align: center;"> No Users Found Nearby  </span> <br></br>'
    }
    user_string += '<div class="friends" id="friends"> <button class="button-light">Find Friends</button> </div>'


    user_list.innerHTML = user_string
}

function show_nearby_unrelated(result) {
    var z = document.createElement('p')
    nearby_list.innerHTML = ''
    const map = new Map(Object.entries(result))
    let user_list = document.getElementById('friends')
    let user_string = ''

    map.forEach(function(value, key) {
        console.log(key + " = " + value.artist_list)
        let dist = Math.round(value.dist)
        let artist_list = value.artist_list.join(', ')
        let genre_list = value.genre_list.join(', ')
        let preview_artist = artist_list
        let preview_genre = genre_list
        if (artist_list.length >= 10) {
            preview_artist = artist_list.substring(0, 12) + '(...)'
        }
        if (genre_list.length >= 10) {
            preview_genre = genre_list.substring(0, 12) + '(...)'
        }
        preview_genre = capitalizeTheFirstLetterOfEachWord(preview_genre.replace(/-/g, " "))

        user_string += '<li>' +
            '    <span class="user__info img"><img src="../favicon.ico" alt="Profile Picture" class="img-responsive" style="float:left; width:40%; padding-right:10px;border-radius: 50%;"></span> <span class="mybolder2" id="mybold2">' + value.username + ' </span> <span style="padding-left: 5px;"> <small id="mybold2">' + dist + 'km </small></span> <br>' +
            '<span id="mybold21"> Artist/s: </span>  <small id="mysmolbold2">' + preview_artist + '</small> <br>' +
            '<span id="mybold21"> Genre/s: </span><small id="mysmolbold2">' + preview_genre + '</small>  </li>'
        console.log(z)
        z.innerHTML = user_string
        nearby_list.appendChild(z)
    })
    if (user_string == '') {
        user_string += ' <span id="mybold" style="text-align: center;"> No Users Found Nearby  </span> <br></br></li>'

    }
}

function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ')
    for (var i = 0; i < separateWord.length; i++) {
        separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
            separateWord[i].substring(1)
    }
    return separateWord.join(' ')
}