
module.exports = {
	noentry: (req, res) => {
		return res.status(500).json({confirmation: 'failed', message: 'You will have to enter the correct secret to enter'});
	}
}