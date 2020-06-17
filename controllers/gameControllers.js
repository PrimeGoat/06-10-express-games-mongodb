const Game = require('../models/Games');

module.exports = {
	getAllGames: (req, res) => {
		Game.find().then(games => {
			return res.json(games);
		}).catch(err => {
			return res.status(500).json({message: err});
		});
	},

	getSingleGame: (req, res) => {
		Game.findOne({name: req.params.name})
		.then(game => {
			if(!game) {
				return res.status(404).json({confirmation: 'failed', message: "game not found"});
			} else {
				return res.status(200).json({confirmation: 'success', game});
			}
		});
	},

	createGame: (req, res) => {
		if(!req.body.name || !req.body.description || !req.body.secret) {
			return res
			.status(400)
			.json({ confirmation: "failed", message: "You must specify name, description, secret"});
		}

		Game.findOne({name: req.params.name})
		.then(game => {
			if(game) {
				return res.status(500).json({confirmation: 'failed', message: "game already exists"});
			} else {
				// Create game
				if(!req.body.name) {
					return res.status(500).json({confirmation: 'failed',
					message: 'Required field: name'});
				}
				if(!req.body.description) {
					return res.status(500).json({confirmation: 'failed',
					message: 'Required field: description'});
				}
				if(!req.body.secret) {
					return res.status(500).json({confirmation: 'failed',
					message: 'Required field: secret'});
				}

				const newGame = new Game();
				newGame.name = req.body.name;
				newGame.description = req.body.description;
				if(req.body.released) newGame.released = req.body.released;
				if(req.body.playtime) newGame.playtime = req.body.playtime;
				newGame.secret = req.body.secret;
				if(req.body.timestamp) newGame.timestamp = req.body.timestamp;

				return newGame.save()
				.then(game => {
					return res.status(200).json({confirmation: 'success', game});
				})
				.catch(err => {
					return res.status(500).json({confirmation: 'failed', message: err});
				});
			}
		})
		.catch(err => {
			return res.status(500).json({confirmation: 'failed', message: 'Couldn\'t lookup if game already exists', error: err});
		});
	},
	
	updateGame: (req, res) => {
		Game.findOne({name: req.params.name})
		.then(game => {
			if(!game) {
				return res.status(404).json({confirmation: 'failed', message: "game not found"});
			} else {
				if(req.body.name) game.name = req.body.name;
				if(req.body.description) game.description = req.body.description;
				if(req.body.released) game.released = req.body.released;
				if(req.body.playtime) game.playtime = req.body.playtime;
				if(req.body.secret) game.secret = req.body.secret;
				if(req.body.timestamp) game.timestamp = req.body.timestamp;

				return game.save()
				.then(game => {
					return res.status(200).json({confirmation: 'success', game});
				})
				.catch(err => {
					return res.status(500).json({confirmation: 'failed', message: err});
				});
			}
		})
		.catch(err => {
			return res.status(500).json({confirmation: 'failed', message: 'Couldn\'t lookup if game exists', error: err});
		});
	},
	
	delete: (req, res) => {
		Game.findOne({name: req.params.name})
		.then(game => {
			if(!game) {
				return res.status(404).json({confirmation: 'failed', message: "game not found"});
			} else {
				game.delete()
				.then(info => {
					return res.status(200).json({confirmation: 'success', info});
				})
				.catch(err => {
					return res.status(500).json({confirmation: 'failed', err});
				});
			}
		})
		.catch(err => {
			return res.status(500).json({confirmation: 'failed', message: 'Couldn\'t lookup if game exists', error: err});
		});
	}
};