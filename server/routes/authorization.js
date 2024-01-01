require('dotenv').config();
const router = require('express').Router();
const { register, getPw } = require('../database_tools/auth_db');
const multer = require('multer');
const upload = multer({ dest: "uploads/" });
const bcrypt = require('bcrypt');
const { createToken } = require('../middleware/auth');


/**
 * Registers user. Supports urlencoded, multipart and json parameters.
 * Creates also JTW token (registered user is automatically logged)
 */
router.post('/register', upload.none(), async (req, res) => {
    const username = req.body.username;
    const pw = req.body.pw;

    try {
        const pwHash = await bcrypt.hash(pw, 10);
        const userid = await register(username, pwHash);
        const token = createToken(userid, username);
        console.log("UserID (register): ", userid);
        res.status(200).json({
            jwtToken: token,
            userid: userid
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ error: "Error during registration." });
    }
});

/**
 * Login user and return JWT token as response. Token contains username and userid.
 */
router.post('/login', upload.none(), async (req, res) => {
    const username = req.body.username;
    const pw = req.body.pw;

    try {
        const db_userdata = await getPw(username);
        const db_pw = db_userdata.pw;
        const db_userid = db_userdata.userid;

        if (db_pw) {
            const isAuth = await bcrypt.compare(pw, db_pw);
            if (isAuth) {
                const token = createToken(db_userid, username);
                res.status(200).json({
                    userid: db_userid,
                    username: username,
                    jwtToken: token,
                });
            } else {
                res.status(401).end('User not authorized');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;