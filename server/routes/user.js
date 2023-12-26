require('dotenv').config()
const router = require('express').Router();
const { getUser } = require('../database_tools/user_db');
const { auth } = require('../middleware/auth');

/**
 * Endpoint for getting user/users using query parameter like localhost:300?username=repe
 * Returns all users if no username defined
 */
router.get('/:userid', async (req, res) => {
    const userid = req.params.userid;

    try {
        const users = await getUser(userid);
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ error: "User not found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

/**
 * Endpoint for getting personal data for user. Token is checked in the auth middleware.
 */
router.get('/personal', auth, async (req, res) => {
    try {
        const username = res.locals.username;
        res.status(200).json({ 
                username: username,
                personalData: "Some personal data"
            });
    } catch (err) {
        res.status(505).json({ error: err.message });
    }
});

module.exports = router;
