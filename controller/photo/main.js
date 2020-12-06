module.exports = {
	get: async (req, res) => {
		console.log('여기는 메인페이지 API입니다');
		console.log(req.headers);
		res.sendStatus(200);
	}
};

