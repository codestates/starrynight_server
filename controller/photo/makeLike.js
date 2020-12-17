const { Favorite } = require("../../models");
const jwt = require("jsonwebtoken");
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    try {
      // 클라이언트로부터 로그인 토큰정보, 좋아요 누른 사진의 경로를 받아온다
      const { photoId, photoPath } = req.body;
      const userToken = req.headers.authorization;

      // Token을 decoding 한다
      let token = userToken;
      let decode = jwt.verify(token, KEY);

      // 새 좋아요 인스턴스를 만든다
      const newFavorite = await Favorite.create({
        photoId: photoId,
        pickerId: decode.id,
      });

      const update = await Favorite.update(
        { favorite: true },
        {
          where: {
            id: newFavorite.dataValues.id,
            photoId: newFavorite.dataValues.photoId,
            pickerId: newFavorite.dataValues.pickerId,
          },
        }
      );

      // 좋아요 성공 시 success: true 값과 함께 좋아요 정보를 보내준다
      // res.status(201).json({ success: true });
      res.status(201).send("좋아요 성공");
    } catch (err) {
      // 좋아요 실패 시 success: false 값을 보내준다
      res.status(500).json({ success: false });
    }
  },
};
