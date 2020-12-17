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
      const [newLike, created] = await Favorite.findOrCreate({
        where: { pickerId: decode.id, photoId: photoId },
        defaults: { favorite: 1 },
      });

      if (created) {
        if (created === 0) {
          Favorite.update(
            { favorite: 1 },
            {
              where: {
                pickerId: created.dataValues.pickerId,
                photoId: created.dataValues.photoId,
              },
            }
          );
        } else {
          Favorite.update(
            { favorite: 0 },
            {
              where: {
                pickerId: created.dataValues.pickerId,
                photoId: created.dataValues.photoId,
              },
            }
          );
        }
      }
      res.status(201).json("좋아요를 눌렀습니다 :)");
    } catch (err) {
      res.status(500).send("실패입니다");
    }
  },
};
