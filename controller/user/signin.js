const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const qs = require('querystring');

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
          process.env.SECRET_KEY,
          { expiresIn: '20d' }
        );

        let accessToken = jwt.sign(
          { id: userData.id },
          process.env.SECRET_KEY,
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
    const form = {
      code: code,
      client_id: process.env.GOOGLE_ID,
      client_secret: process.env.GOOGLE_SECRET_KEY,
      redirect_uri: 'https://api.mystar-story.com/user/signin/google',
      grant_type: 'authorization_code'
    };

    let token = await axios.post(url, qs.stringify(form));
    console.log('구글 로그인 사용자의 토큰 : ', token);

    let userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
    console.log('토큰으로 사용자 정보를 받음 : ', userInfo);
  },

  kakao: async (req, res) => {
    const url = 'https://kauth.kakao.com/oauth/token';
    const code = req.query.code;
    const form = {
      code: code,
      client_id: process.env.KAKAO_KEY,
      client_secret: process.env.KAKAO_SECRET_KEY,
      redirect_uri: 'https://api.mystar-story.com/user/signin/kakao',
      grant_type: 'authorization_code'
    };

    let token = await axios.get(url, qs.stringify(form));
    console.log('카카오 로그인 사용자의 토큰 : ', token);

    let userInfo = await axios({
      method: "GET",
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('토큰으로 사용자 정보를 받음 : ', userInfo);
  }
}

