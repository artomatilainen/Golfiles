require('dotenv').config();
const router = require('express').Router();
const { getUser } = require('../database_tools/user_db');
const { auth } = require('../middleware/auth');

/**
 * Endpoint for getting user/users using query parameter like localhost:3000/user/2
 */
router.get('/byuserid/:userid', async (req, res) => {
    const userid = req.params.userid;
    console.log('UserId: ', userid);

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
 * Endpoint for getting personal data for user. Token is checked in the auth middleware.
 */
router.get('/personal', auth, async (req, res) => {
    console.log('UserId1: ', res.locals.userid);
    console.log('UserId2: ', userid.value);
    try {
        const user = await this.getUser(userid.value);
        res.status(200).json({
            username: username,
            personalData: "Some personal data"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
