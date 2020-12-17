const { Favorite } = require("../../models");
const jwt = require("jsonwebtoken");
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    // 클라이언트로부터 로그인 토큰정보, 좋아요 누른 사진의 경로를 받아온다
    const { photoId, photoPath } = req.body;
    const userToken = req.headers.authorization;

    // Token을 decoding 한다
    let token = userToken;
    let decode = jwt.verify(token, KEY);

    // 새 좋아요 인스턴스를 만든다
    try {
      const [newLike, created] = await Favorite.findOrCreate({
        where: { pickerId: decode.id, photoId: photoId },
        defaults: {
          favorite: true,
        },
      });

      if (created) {
        Favorite.update(
          { favorite: false },
          {
            where: {
              pickerId: decode.id,
              photoId: photoId,
            },
          }
        );
      }
      res.status(201).json("회원가입이 완료되었습니다.");
    } catch (err) {
      res.status(500).send("실패입니다");
    }
  },
};
