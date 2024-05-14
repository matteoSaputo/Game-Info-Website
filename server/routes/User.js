const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        bcrypt.hash(password, 10).then(hash => {
            User.create({
                username: username,
                email: email,
                password: hash
            });
        });
        res.json("SUCCESS");
    } catch {
        res.json({ error: "Failed to register" });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } });

    if (!user) return res.json({ error: "User does not exist" });

    bcrypt.compare(password, user.password).then(match => {
        if (!match) res.json({ error: "Wrong username and password combination" });
        res.json("Logged in!");
    })
})

module.exports = router;