const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO users (username, pw, create_time) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING userid',
    DELETE_ACCOUNT: 'DELETE FROM users WHERE userid=$1',
    GET_PW: 'SELECT userid, pw FROM users WHERE username=$1'
};

/**
 * Register new user
 */
async function register(username, pwHash) {
    try {
        const result = await pgPool.query(sql.REGISTER, [username, pwHash]);
        return result.rows[0].userid;
    } catch (error) {
        // Check if the error is a unique constraint violation
        if (error.code === '23505' && error.constraint === 'unique_username') {
            throw new Error('Username already exists. Please choose another.');
        } else {
            // Rethrow other errors
            throw error;
        }
    }
}

/**
 * Gets database password hash and user id by username.
 */
async function getPw(username) {
    const result = await pgPool.query(sql.GET_PW, [username]);

    if (result.rows.length > 0) {
        return {
            userid: result.rows[0].userid, // Corrected from result.rows[0].id to result.rows[0].userid
            pw: result.rows[0].pw
        };
    } else {
        return null;
    }
}

module.exports = { register, getPw };
