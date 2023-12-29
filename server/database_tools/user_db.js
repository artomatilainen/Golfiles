const { use } = require('chai');
const pgPool = require('./pg_connection');

const sql = {
    GET_USER: 'SELECT userid, username, create_time FROM users WHERE userid=$1',
    GET_ALL_USERS: 'SELECT userid, username, create_time FROM users',    
}

/**
 * Get one user by username or all users if username not defined.
 */
async function getUser(userid) {

    if (userid) {
        // Return one user.
        let result = await pgPool.query(sql.GET_USER, [userid]);
        return result.rowCount > 0 ? result.rows : null;
    }

    // Return all users.
    let result = await pgPool.query(sql.GET_ALL_USERS);
    return result.rows;
}

module.exports = { getUser }