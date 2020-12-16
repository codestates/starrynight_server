const { Reply, Photo } = require("../../models");
const jwt = require("jsonwebtoken");
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    try {
      // 클라이언트로부터 로그인 토큰정보, 댓글을 받아온다
      const { comment } = req.body;
      const userToken = req.headers.authorization;

      // Token을 decoding 한다
      let token = userToken;
      let decode = jwt.verify(token, KEY);

      // 인스턴스들 중 사용자가 취소하고자 하는 좋아요를 확인한다
      const wasReplied = await Reply.findOne({
        where: { writerId: decode.id, comment: comment },
      });

      // 댓글정보를 null로 초기화한다
      const delReply = await Reply.update(
        { photoId: null, comment: null },
        { where: { writerId: wasReplied.writerId, comment: comment } }
      );

      // 댓글삭제 성공 시 success: true 값을 보내준다
      res.status(201).json({ success: true });
    } catch (err) {
      // 댓글 생성 실패 시 success: false 값을 보내준다
      res.status(500).json({ success: false });
    }
  },
};
