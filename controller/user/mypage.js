const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

function findAuthorized(res, acc, ref) {
  // 모든 토큰이 없을 경우
  if (!acc && !ref) {
    res.status(401).send('다시 로그인 해주세요');
  } else {
    if (acc) {
      return acc;
    } else {
      return ref;
    }
  }
}

module.exports = {
  info: async (req, res) => {
    // Production
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
    const decode = jwt.verify(token, KEY);

    if (decode) {
      let userData = await User.findOne({ where: { id: decode.id } });

      if (userData) {
        res.status(200).json({
          email: userData.email,
          password: '******',
          nickname: userData.nickname,
          mobile: userData.mobile,
          profilePath: userData.profilePath,
          loginPlatformId: userData.loginPlatformId
        });
      } else {
        res.status(204).send(err);
      }
    }
  }
}
