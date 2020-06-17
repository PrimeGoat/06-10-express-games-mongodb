const quote = require("../middleware/quotes");
const Game = require('../models/Games');

module.exports = {
	getEnter: (req, res) => {
		return res.status(200).json({confirmation: 'success', message: 'You have entered the correct secret for ' + req.params.name + '\nHere is your quote: ' + quote()});
	},

	postEnter: (req, res) => {
		Game.findOne({name: req.params.name})
		.then(game => {
			if(!game) return res.status(404).json({confirmation: 'failed', message: "game not found"});
			if(game.secret != req.body.secret) return res.redirect('/api/v1/games/noentry');
			return res.redirect('/api/v1/games/enter/' + req.params.name);
		});
	}
};

