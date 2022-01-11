async function set_password(request, email, password) {
    const pool = request.app.get('connection')
    try {
        const result = await pool.query('UPDATE accounts SET password= $1 WHERE email = $2', [password, email])
        console.log(result.affectedRows + " record(s) updated")
    } catch (error) {
        console.log('Error updating password(catch): ' + error)
    }
}

async function get_id_by_user(request, username) {
    const pool = request.app.get('connection')
    let id = null
    try {
        const result = await pool.query('SELECT id FROM accounts WHERE username=$1', [username])
        id = result.rows[0].id
    } catch (error) {
        console.log('Error getting id by username(catch): ' + error)
    }
    return id
}

module.exports = {
    set_password,
    get_id_by_user
}