const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = {
  info: async (req, res) => {
    // Production
    const token = req.headers.authorization;
    console.log(token);
    // 해당 토큰이 유효한지 판단
    const decode = jwt.verify(token, KEY);
    console.log('토큰 디코딩 정보 : ', decode);


    if (decode) {
      let userData = await User.findOne({ where: { id: 9 } });

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
