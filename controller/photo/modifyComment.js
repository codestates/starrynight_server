const { Reply, Photo } = require("../../models");
const jwt = require("jsonwebtoken");
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    try {
      // 클라이언트로부터 로그인 토큰정보, 댓글 단 사진의 경로, 댓글을 받아온다
      const { photoPath, comment } = req.body;
      const userToken = req.headers.authorization;

      // Token을 decoding 한다
      let token = userToken;
      let decode = jwt.verify(token, KEY);

      // 해당 댓글을 검색한다
      const photo = await Photo.findOne({
        where: {
          photoPath: photoPath,
        },
      });
      const thatReply = await Reply.findOne({
        where: {
          writerId: decode.id,
          comment: comment,
          photoId: photo.id,
        },
      });

      // 검색된 댓글 인스턴스에 변경된 댓글을 업데이트한다
      const changeReply = await thatReply.update(
        { comment: comment },
        { where: { photoId: thatReply.id, writerId: decode.id } }
      );

      // 댓글 수정 성공 시 success: true 값을 보내준다
      res.status(201).json({ success: true });
    } catch (err) {
      // 댓글 수정 실패 시 success: false 값을 보내준다
      res.status(500).json({ success: false });
    }
  },
};
