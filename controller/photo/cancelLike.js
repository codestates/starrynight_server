const { Favorite, Photo } = require("../../models");
const jwt = require("jsonwebtoken");
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    try {
      // 클라이언트로부터 로그인 토큰정보, 좋아요 누른 사진의 경로를 받아온다
      const { photoPath } = req.body;
      const userToken = req.headers.authorization;

      // Token을 decoding 한다
      let token = userToken;
      let decode = jwt.verify(token, KEY);

      // 인스턴스들 중 사용자가 취소하고자 하는 좋아요를 확인한다
      const wasFavor = await Favorite.findOne({
        where: { pickerId: decode.id },
      });

      // 사진정보(photoId)를 null로 초기화한다
      const cancelLike = await wasFavor.update(
        { photoId: null },
        { where: { pickerId: wasFavor.pickerId } }
      );

      // 좋아요취소 성공 시 success: true 값과 함께 좋아요취소 정보를 보내준다
      res.status(201).json({ ...cancelLike, success: true });
    } catch (err) {
      // 좋아요취소 실패 시 success: false 값을 보내준다
      res.status(500).json({ success: false });
    }
  },
};
