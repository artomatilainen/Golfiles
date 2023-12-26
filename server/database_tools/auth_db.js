const pgPool = require('./pg_connection');


const sql = {
    REGISTER: 'INSERT INTO user (username, pw) VALUES ($1,$2) RETURNING "userid"',
    DELETE_ACCOUNT: 'DELETE FROM user WHERE "userid"=$1',
    GET_PW: 'SELECT "userid", pw FROM user WHERE username=$1'
}

/**
 * Register new user
 */
async function register(username, pwHash) {
    const result = await pgPool.query(sql.REGISTER, [username, pwHash]);
    return result.rows[0].id;
}

/**
 * Gets database password hash and user id by username.
 */
async function getPw(username) {
    const result = await pgPool.query(sql.GET_PW, [username]);

    if (result.rows.length > 0) {
        return {
            userid: result.rows[0].id,
            pw: result.rows[0].pw
        };
    } else {
        return null;
    }
}

module.exports = { register, getPw };