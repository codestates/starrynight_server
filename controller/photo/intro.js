module.exports = {
	get: async (req, res) => {
		res.sendStatus(200); // ELB Health Check
	}
};
