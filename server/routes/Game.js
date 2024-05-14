const express = require('express');
const router = express.Router();
const { Game } = require('../models');

const publishers = new Set();

router.get('/', (req, res) => {
    res.send("hello world")
})

router.post('/populate', async (req, res) => {
    const genres = await fetch('https://api.rawg.io/api/genres?key=e5697c7dfc4641458bbb23fb7a9f6748', {
        'Content-Type': 'application/json'
    });
    let data = await genres.json();
    const games = [];

    data.results.forEach(genreElement => {
        const genre = genreElement.name;
        genreElement.games.forEach(game => {
            games.push({
                title: game.name,
                genre: genre,
                company: null,
                system: null,
                thumbnail: null,
                release_date: null,
                description: null,
                RAWGid: game.id
            })
        }) 
    });

    const companies = await fetch('https://api.rawg.io/api/publishers?key=e5697c7dfc4641458bbb23fb7a9f6748&page_size=72717', {
        'Content-Type': 'application/json'
    });
    data = await companies.json();

    data.results.forEach(pub => {
        const pubName = pub.name;
        pub.games.forEach(pubGame => {
            const id = pubGame.id;
            games.forEach(game => {
                if(game.RAWGid === id){
                    game.company = pubName;
                    publishers.add(pubName);
                }
            })
        })
    })

    const fetchGameInfo = games.map(async game => {
        const gameInfo = await fetch(`https://api.rawg.io/api/games/${game.RAWGid}?key=e5697c7dfc4641458bbb23fb7a9f6748`, {
            'Content-Type': 'application/json'
        });
        data = await gameInfo.json();
        game.description = data.description;
        game.thumbnail = data.background_image;
        game.release_date = data.released;
        game.system = data.platforms[0].platform.name;
        delete game.RAWGid;
    })

    await Promise.all(fetchGameInfo);

    try{
        games.map(async game => {
            await Game.create(game);
        })
    }catch{
        return res.json({error: "failed to populate table"})
    }

    await res.json(games);
})

router.post('/', async (req, res) => {
    const post = req.body; 
    await Game.create(post);
    res.json(post);     
})

module.exports = router;