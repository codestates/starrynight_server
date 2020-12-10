const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = {
  info: async (req, res) => {
    // Production
    const token = req.headers.authorization;

    console.log('마이페이지입니다~!!', token);

    // 해당 토큰이 유효한지 판단
    const decode = jwt.verify(token, KEY);
    console.log(`디코딩된 토큰 정보 : `,decode);
    if (decode) {
      let userData = await User.findOne({ where: { id: decode.id } });

      if (userData) {
        res.status(200).json({
          email: userData.email,
          password: '******',
          nickname: userData.nickname,
          mobile: userData.mobile,
          profilePath: userData.profilePath
        });
      } else {
        res.status(204).send(err);
      }
    }
  }
}
