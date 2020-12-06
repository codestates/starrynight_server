module.exports = {
  get: async (req, res) => {
	  console.log('hihihihi');
	console.log(req.headers);
	res.sendStatus(200);
  }
};
