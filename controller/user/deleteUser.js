const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

function findAuthorized(res, acc, ref) {
  // 모든 토큰이 없을 경우
  if (!acc && !ref) {
    res.status(401).send('다시 로그인 해주세요');
  } else {
    if (acc) {
      return [acc];
    } else {
      // Access Token 재생성
      let accessToken = jwt.sign(
        { id: id },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );

      return [ref, accessToken];
    }
  }
}

module.exports = {
  delete: async (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token[0], KEY);

    if (decode) {
      res.clearCookie('refreshToken');
      const result = await User.destroy({ where: { id: decode.id } });

      if (result) {
        res.status(200).send('탈퇴가 완료되었습니다.');
      }
    }
  },
}