const { Favorite, Photo } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  get: async (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, KEY);
    let result = [];

    if (decode) {
      // 해당 사용자가 좋아요를 한 사진들의 id를 뽑아온다.
      const favoritePhotos = await Favorite.findAll({
        where: { pickerId: decode.id, },
        attributes: ['photoId']
      });

      // 그 사진들의 path를 추출한다.
      for (let i = 0; i < favoritePhotos.length; i++) {
        const findPickerPhotosInfo = await Photo.findOne({
          where: { id: favoritePhotos[i].photoId },
          attributes: ['id', 'photoPath']
        });
        result.push(findPickerPhotosInfo);
      }

      res.status(200).json(result);
    }
  },
}