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

      // 새 좋아요 인스턴스를 만든다
      const protoFavorite = await Favorite.create({
        pickerId: decode.id,
      });

      // 만들어진 좋아요 인스턴스에 사진정보(photoId) 값을 추가한다
      const photo = await Photo.findOne({ where: { photoPath: photoPath } });
      const newFavorite = await protoFavorite.update(
        { photoId: photo.id },
        { where: { pickerId: decode.id } }
      );

      // 좋아요 성공 시 success: true 값과 함께 댓글정보를 보내준다
      res.status(201).json({ ...newFavorite, success: true });
    } catch (err) {
      // 좋아요 실패 시 success: false 값을 보내준다
      res.status(500).json({ success: false });
    }
  },
};
