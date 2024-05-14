const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Game, Review, User } = require('../models');

// Express route to handle review submission
router.post('/:gameId/reviews', async (req, res) => {
    const GameId = req.params.gameId;
    const { username, password, reviewText, rating } = req.body;
    
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.json({ error: 'User does not exist' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ error: 'Invalid username or password combination' });
        }

        // If the username and password are valid, proceed to create the review
        await Review.create({ GameId, UserId: user.id, reviewText, rating });

        res.json({ message: 'Review submitted successfully.' });
    } catch (error) {
        res.json({ error: 'Failed to write review' });
    }
});



router.get('/search', async (req, res) => {
    const { query, criteria } = req.query;
    try {
        const games = await Game.findAll({
            attributes: [
                'id',
                'title',
                'genre',
                'company',
                'system',
                'thumbnail',
                'release_date',
                'description'
            ]
        })

        const filteredGames = games.filter(game => game[criteria].toLowerCase().includes(query.toLowerCase()));

        res.json(filteredGames);
    } catch(error) {
        return res.json({ error: 'Failed to get Games', message: '' })
    }

})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const games = await Game.findOne({
            attributes: [
                'id',
                'title',
                'genre',
                'company',
                'system',
                'thumbnail',
                'release_date',
                'description'
            ],
            where: { id }
        })

        res.json(games);
    } catch {
        return res.json({ error: "Failed to get Games" })
    }
})

router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll({
            attributes: [
                'id',
                'title',
                'genre',
                'company',
                'system',
                'thumbnail',
                'release_date',
                'description'
            ]
        })

        res.json(games);
    } catch {
        return res.json({ error: "Failed to get Games" })
    }
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
                if (game.RAWGid === id) {
                    game.company = pubName;
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

    try {
        games.map(async game => {
            await Game.create(game);
        })
    } catch {
        return res.json({ error: "failed to populate table" })
    }

    return await res.json(games);
})

router.post('/', async (req, res) => {
    const post = req.body;
    await Game.create(post);
    res.json(post);
})

module.exports = router;