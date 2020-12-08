const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email, password } });

    try {
      if (userData === null) {
        res.status(404).send('이메일 또는 비밀번호가 잘못되었습니다.');
      } else {

        let refreshToken = jwt.sign(
          { id: userData.id },
          KEY,
          { expiresIn: '20d' }
        );

        let accessToken = jwt.sign(
          { id: userData.id },
          KEY,
          { expiresIn: '1d' }
        );

        console.log('로그인 (RefreshToken) : ', refreshToken);
        console.log('로그인 (AccessToken) : ', accessToken);

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });

        res.status(200).json({ accessToken: accessToken });
      }
    } catch (err) {
      res.sendStatus(500);
    }
  },

  google: async (req, res) => {
    const url = 'https://www.googleapis.com/oauth2/v4/token';
    const code = req.query.code;
    let form = {
      code: code,
      client_id: process.env.GOOGLE_ID,
      client_secret: process.env.GOOGLE_SECRET_KEY,
      redirect_uri: 'https://api.mystar-story.com/user/signin/google',
      grant_type: 'authorization_code'
    };
    let token = await axios.post(url, form);
    console.log(token);
  }
}

