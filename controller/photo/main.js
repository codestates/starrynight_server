module.exports = {
	get: async (req, res) => {
		if (req.headers.authorization === undefined) {
			res.status(404).json('토큰이 없습니다!!');
		} else {
			res.status(200).json(req.headers.authorization);
		}
	}
};

