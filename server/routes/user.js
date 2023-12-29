require('dotenv').config();
const router = require('express').Router();
const { getUser } = require('../database_tools/user_db');
const { auth } = require('../middleware/auth');

/**
 * Endpoint for getting user/users using query parameter like localhost:3000/user/user/aj
 */
router.get('/user/:userid', async (req, res) => {
    const userid = req.params.userid;
    
    try {
        const user = await getUser(userid);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * Endpoint for getting personal data for the user. Token is checked in the auth middleware.
 */
router.get('/personal', auth, async (req, res) => {
    console.log('UserID: ', res.locals.userid);
    const userid = res.locals.userid;

    try {
        const user = await getUser(userid);

        if (user && user.length > 0) {
            const userData = user[0];
            console.log('User: ', userData);

            const responseObject = {
                username: userData.username,
                createdate: userData.create_time,
                personalData: "Some personal data"
            };
            console.log('ResponseObject: ', responseObject);
            res.status(200).json(responseObject);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err);

        // Handle errors and send an appropriate response
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});


module.exports = router;
