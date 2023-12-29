require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Middleware for authorization. Checks the token validity
 * and parses the username from the token. 
 */
function auth(req, res, next) {
    //Get the bearer token from authorization header
    const token = req.headers.authorization?.split(' ')[1];

    //Verify the token. Verified token contains username
    //res.locals stores the username during the life of the request
    //next() directs to the next middleware in stack.
    try {
        console.log('Token: ', token);
        const userdata = jwt.verify(token, process.env.JWT_SECRET_KEY);
        //const username = jwt.verify(token, process.env.JWT_SECRET_KEY).username;

        res.locals.userid = userdata.userid;
        res.locals.username = userdata.username;
        next();
    } catch (err) {
        res.status(403).send('Forbidden');
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