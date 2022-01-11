async function get_genre_by_artist_id(id_artist) {
    var genre = 'none'
    let resCallback, rejCallback
    const returnPromise = new Promise((resolve, reject) => {
        resCallback = resolve
        refCallback = reject
    })

    console.log(id_artist)
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const res = await fetch("https://api.spotify.com/v1/artists/" + id_artist, requestOptions)
        .then((response) => response.json())
        .then((responseJSON) => {
            if (typeof(responseJSON.genres[0]) != 'undefined') genre = responseJSON.genres[0].replace(/ /g, "-")
        });

    return (genre)
}


function play_uri(uri, position) {
    var url = "https://api.spotify.com/v1/me/player/play?device_id=" + new_device

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = '{"context_uri": "' + uri + '","offset": {"position": ' + position + '},"position_ms": 0}'

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    get_playback_info()
}

function play_pause() {
    console.log("is playing: " + isPlaying)
    if (isPlaying) {
        pause()
        isPlaying = false;
        play_ico.style.display = "block"
        pause_ico.style.display = "none"
    } else {
        play()
        isPlaying = true;
        play_ico.style.display = "none"
        pause_ico.style.display = "block"
    }
}

function play() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/me/player/play", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    get_playback_info()
    isPlaying = true;
}

function pause() {
    var url = "https://api.spotify.com/v1/me/player/pause?device_id=" + new_device
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function next_track() {
    var url = "https://api.spotify.com/v1/me/player/next?device_id=" + new_device
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function previous_track() {
    var url = "https://api.spotify.com/v1/me/player/previous?device_id=" + new_device
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function get_playback_info() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    // Calling this every second is dumb, I know, I dont care
    setInterval(function() {
        fetch("https://api.spotify.com/v1/me/player?market=ES&additional_types=episode", requestOptions)
            .then(response => response.text())
            .then(result => show_track_info(JSON.parse(result)))
            .catch(error => console.log('error', error));
    }, 900);
}

function set_volume(volume_percent) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.spotify.com/v1/me/player/volume?volume_percent=" + volume_percent, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function show_track_info(result) {
    if ((typeof(result.item) != "undefined")) {
        var duration = result.item.duration_ms
        var progress = result.progress_ms

        var track_progress = (progress / duration) * 100
        progress_bar.style.left = track_progress + '%'
        song_timestamp.innerHTML = millisToMinutesAndSeconds(progress)
        song_duration.innerHTML = millisToMinutesAndSeconds(duration)
    }
}

function refresh_auth() {
    console.log("token: " + token)
    console.log("refresh_token: " + refresh_token)
}


function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}