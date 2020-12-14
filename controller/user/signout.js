const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, KEY);

    if (decode) {
      res.clearCookie('refreshToken');
      res.status(200).send('사용자가 로그아웃을 했습니다.');
    }
  }
}