const { Photo } = require('../../models');

module.exports = {
	get: async (req, res) => {
		const photos = await Photo.findAll(
			{ attributes: ['id', 'photoPath'] }
		);

		let reversePhotos = photos.reverse();
		res.status(200).json(reversePhotos);
	}
};

