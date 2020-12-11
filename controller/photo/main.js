const { Photo } = require('../../models');

module.exports = {
	get: async (req, res) => {
		const photos = await Photo.findAll(
			{ attributes: ['id', 'photoPath'] }
		);

		res.status(200).json(photos);
	}
};

