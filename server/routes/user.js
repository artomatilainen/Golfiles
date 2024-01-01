const router = require('express').Router();
const { getUser } = require('../database_tools/user_db');
const { auth } = require('../middleware/auth');

/**
 * Endpoint for getting user/users using query parameter like localhost:3000/user/user/2
 */
router.get('/user/:userid', async (req, res) => {
    const userid = req.params.userid;

    // Validate that userid is a valid number
    if (isNaN(userid)) {
        return res.status(400).json({ error: "Invalid userid. Must be a number." });
    }

    try {
        const user = await getUser(userid);

        if (user && user.length > 0) {
            res.status(200).json({ data: user });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

/**
 * Endpoint for getting personal data for the user. Token is checked in the auth middleware.
 */
router.get('/personal', auth, async (req, res) => {
    const userid = res.locals.userid;

    try {
        const user = await getUser(userid);

        if (user && user.length > 0) {
            const userData = user[0];

            const responseObject = {
                userid: userData.userid,
                username: userData.username
            };
            console.log('Response object: ', responseObject);
            res.status(200).json({ data: responseObject });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

module.exports = router;
