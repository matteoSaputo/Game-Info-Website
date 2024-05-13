const express = require('express');
const router = express.Router();
const { Game } = require('../models');

router.get('/', (req, res) => {
    res.send("hello world")
})

router.post('/', async (req, res) => {
    const post = req.body; 
    await Game.create(post);
    res.json(post);
})

module.exports = router;