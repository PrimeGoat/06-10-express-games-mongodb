const express = require('express');
const games = require('../models/Games');
const router = express.Router();
const { uuid } = require('uuidv4');

router.get('/getAllGames', (req, res) => {
    if(games.length == 0) {
        return res.status(404).json({confirmation: 'failed', message: "No games found"});
    }
    return res.status(200).json({ confirmation: 'success', games });
});

router.get('/getSingleGame/:id', (req, res) => {
    const game = games.filter(game => game.id == req.params.id);

    if(game.length == 0) {
        return res.status(404).json({confirmation: 'failed', message: "game not found"});
    }

    return res.status(200).json({confirmation: 'success', game});
    //res.send(req.params.id);
});

// create game
router.post('/createGame', (req, res) => {
    if(!req.body.name || !req.body.description || !req.body.playtime || !req.body.yearReleased) {
        return res
            .status(400)
            .json({ confirmation: "failed", message: "You must specify name, description, yearReleased, playtime"})
    }

    const game = games.filter(game => game.name == req.body.name);

    if(game.length > 0) {
        return res.status(400).json({ confirmation: 'fail', message: "game already exists" });
    }

    let newgame = {};

    newgame.id = uuid();
    newgame.name = req.body.name;
    newgame.description = req.body.description;
    newgame.yearReleased = req.body.yearReleased;
    newgame.playtime = req.body.playtime;

    games.push(newgame);

    return res.status(201).json({ message: 'game created', games })
});

// Update game
router.put('/updateGame/:id', (req, res) => {
    const game = games.filter(game => game.id == req.params.id);
    let updatedgame = req.body;

    if(game.length == 0) {
        return res.status(404).json({confirmation: 'failed', message: "game not found"});
    }

    //loop through games array and change the game that matches the id
    games.forEach((game) => {
        console.log(game.id, req.params.id);
        if (game.id === req.params.id) {
            game.name = updatedgame.name ? updatedgame.name : game.name;
            game.description = updatedgame.description ? updatedgame.description : game.description;
            game.yearReleased = updatedgame.yearReleased ? updatedgame.yearReleased : game.yearReleased;
            game.playtime = updatedgame.playtime ? updatedgame.playtime : game.playtime;
        }
    });
    return res.status(201).json({ message: 'game updated', games })
});

// Delete game
router.delete('/:id', (req, res) => {
    const game = games.filter(game => game.id !== req.params.id);

    return res.status(200).json({ message: 'game deleted', game });
});

/*
HEADERS:
Content-Type: application/json


POST mode body:
{
"name":"hans",
"email":"eh@eh.com",
"password":"woo"
}
*/


module.exports = router;