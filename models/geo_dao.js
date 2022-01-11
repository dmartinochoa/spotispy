async function insert_pos(request, id_user, username, genre, artist, lat, lng) {
    const pool = request.app.get('connection')
    try {
        var query = 'INSERT INTO positions("idUser", "username", "geom", "genre", "artist") SELECT \'' + id_user + '\', \'' + username + '\', \'SRID=3035;POINT(' + lat + ' ' + lng + ')\', \'' + genre + '\', \'' + artist +
            '\' WHERE NOT EXISTS (SELECT 1 FROM positions WHERE "idUser" = \'' + id_user + '\' AND "genre" = \'' + genre + '\' AND "artist" = \'' + artist + '\')'
        console.log(query)
        const result = await pool.query(query)
    } catch (error) {
        console.log('Error inserting position track(catch): ' + error)
    }
}

async function get_users_by_pos_track(request, id_user, username, genre, artist, lat, lng) {
    const pool = request.app.get('connection')
    try {
        var query = 'SELECT DISTINCT ON (b.geom, b.id,b.username, b."idUser", b.genre, b.artist) b.id, b.geom, ST_Distance(b.geom, \'SRID=3035;POINT(' + lat + ' ' + lng + ')\')*100 as dist, b.username, b."idUser", b.genre, b.artist FROM positions b WHERE ' +
            '(ST_DWithin(b.geom, \'SRID=3035;POINT(' + lat + ' ' + lng + ')\', 0.5) AND b."idUser" !=  \'' + id_user + '\' AND (b.artist = \'' + artist + '\' OR b.genre = \'' + genre + '\')) ORDER BY "idUser"'
        console.log(query)
        const result = await pool.query(query)
        const result_rows = result.rows
        var result_users = []

        result_rows.forEach(element => {
            if (!result_users.includes(element.idUser)) {
                result_users.push(element.idUser)
            }
        })

        var supamap = new Map()
        result_users.forEach(element => {
            supamap.set(element, { idUser: element, username: '', dist: 0, artist_list: [], genre_list: [] })
        });

        result_rows.forEach(element => {
            var updated_user = (supamap.get(element.idUser))
            updated_user.dist = element.dist
            updated_user.username = element.username
            if (!updated_user.genre_list.includes(element.genre)) updated_user.genre_list.push(element.genre)
            if (!updated_user.artist_list.includes(element.artist)) updated_user.artist_list.push(element.artist)
        })

        console.log(result_rows)
        return supamap

    } catch (error) {
        console.log('Error inserting position track(catch): ' + error)
    }
}

async function get_users_nearby(request, id_user, username, lat, lng) {
    const pool = request.app.get('connection')
    try {
        var query = 'SELECT DISTINCT ON (b.geom, b.id,b.username, b."idUser", b.genre, b.artist) b.id, b.geom, ST_Distance(b.geom, \'SRID=3035;POINT(' + lat + ' ' + lng + ')\')*100 as dist, b.username, b."idUser", b.genre, b.artist FROM positions b WHERE ' +
            '(ST_DWithin(b.geom, \'SRID=3035;POINT(' + lat + ' ' + lng + ')\', 0.5) AND b."idUser" !=  \'' + id_user + '\') ORDER BY "idUser"'
        console.log(query)
        const result = await pool.query(query)
        const result_rows = result.rows
        var result_users = []

        result_rows.forEach(element => {
            if (!result_users.includes(element.idUser)) {
                result_users.push(element.idUser)
            }
        })

        var supamap = new Map()
        result_users.forEach(element => {
            supamap.set(element, { idUser: element, username: '', dist: 0, artist_list: [], genre_list: [] })
        });

        result_rows.forEach(element => {
            var updated_user = (supamap.get(element.idUser))
            updated_user.dist = element.dist
            updated_user.username = element.username
            if (!updated_user.genre_list.includes(element.genre)) updated_user.genre_list.push(element.genre)
            if (!updated_user.artist_list.includes(element.artist)) updated_user.artist_list.push(element.artist)
        })

        console.log(result_rows)
        return supamap

    } catch (error) {
        console.log('Error inserting position track(catch): ' + error)
    }
}


module.exports = { insert_pos, get_users_by_pos_track, get_users_nearby }