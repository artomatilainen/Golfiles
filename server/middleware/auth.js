require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Middleware for authorization. Checks the token validity
 * and parses the username from the token. 
 */

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const userdata = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.locals.userid = userdata.userid;
        res.locals.username = userdata.username;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Forbidden', message: err.message });
    }
}

/**
 * Tool function that creates a JWT token containing the username. 
 */
function createToken(userid, username) {
    return jwt.sign({
        userid: userid,
        username: username
    },
    process.env.JWT_SECRET_KEY);
}


module.exports = { auth, createToken };