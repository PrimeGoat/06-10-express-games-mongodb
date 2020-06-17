const express = require('express');
const Game = require('../models/Games');
const router = express.Router();
const authRouter = require('./authRoutes.js');
const mainRouter = require('./mainRoutes.js');
const gameController = require('../controllers/gameControllers');

router.get('/getallgames', gameController.getAllGames);
router.get('/getsinglegame/:name', gameController.getSingleGame);
router.post('/creategame', gameController.createGame);
router.put('/updategame/:name', gameController.updateGame);
router.delete('/:name', gameController.delete);

router.get('/enter/:name', authRouter.getEnter);
router.post('/enter/:name', authRouter.postEnter);

router.get('/noentry', mainRouter.noentry);

module.exports = router;