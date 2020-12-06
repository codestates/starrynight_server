const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const userData = await User.findOne({ where: { email, password } });

    try {
      if (userData === null) {
        res.status(404).send('이메일 또는 비밀번호가 잘못되었습니다.');
      } else {

        // refresh Token -> cookie
        // access Token -> body

        let refreshToken = jwt.sign(
          { id: userData.id },
          KEY,
          { expiresIn: '14d' }
        );

        let accessToken = jwt.sign(
          { id: userData.id },
          KEY,
          { expiresIn: '1h' }
        );

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });

        res.status(200).json({
          userId: userData.id,
          accessToken: accessToken,
        });
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
}

