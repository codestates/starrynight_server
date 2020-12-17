const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const qs = require('querystring');

function createJWT(id) {
  let refreshToken = jwt.sign(
    { id: id },
    process.env.SECRET_KEY,
    { expiresIn: '20d' }
  );

  let accessToken = jwt.sign(
    { id: id },
    process.env.SECRET_KEY,
    { expiresIn: '1d' }
  );

  return [refreshToken, accessToken];
}

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email, password } });

    try {
      if (userData === null) {
        res.status(404).send('이메일 또는 비밀번호가 잘못되었습니다.');
      } else {
        const tokens = createJWT(userData.id);

        res.cookie('refreshToken', tokens[0], {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });

        res.status(200).json({user: userData, accessToken: tokens[1] });
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
    let userInfo = await axios({
      method: "GET",
      url: `https://www.googleapis.com/oauth2/v1/userinfo`,
      headers: {
        Authorization: `Bearer ${token.data.access_token}`
      }
    });

    /* ************ 구글 ************ */
    // 이미 가입한 이력이 있는지 찾기
    const userData = await User.findOrCreate({
      where: {
        nickname: userInfo.data.name,
        loginPlatformId: 2
      },
      defaults: {
        profilePath: userInfo.data.picture
      }
    });

    if (userData) {
      const tokens = await createJWT(userData[0].dataValues.id);

      res.cookie('refreshToken', tokens[0], {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });

      //res.redirect(`https://mystar-story.com/?access_token=${tokens[1]}`);
      res.redirect(`http://localhost:3000/?access_token=${tokens[1]}`);
    }

  },

  kakao: async (req, res) => {
    const url = 'https://kauth.kakao.com/oauth/token';
    const code = req.query.code;
    const form = {
      code: code,
      client_id: process.env.KAKAO_ID,
      client_secret: process.env.KAKAO_SECRET_KEY,
      redirect_uri: 'https://api.mystar-story.com/user/signin/kakao',
      grant_type: 'authorization_code'
    };

    let token = await axios.post(url, qs.stringify(form));

    let userInfo = await axios({
      method: "GET",
      url: `https://kapi.kakao.com/v2/user/me`,
      headers: {
        Authorization: `Bearer ${token.data.access_token}`
      }
    });

    /* ************ 카카오 ************ */
    const userData = await User.findOrCreate({
      where: {
        nickname: userInfo.data.properties.nickname,
        loginPlatformId: 3
      },
      defaults: {
        profilePath: userInfo.data.properties.profile_image
      }
    });

    if (userData) {
      const tokens = await createJWT(userData[0].dataValues.id);

      res.cookie('refreshToken', tokens[0], {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      // res.redirect(`https://mystar-story.com/?access_token=${tokens[1]}`);
      res.redirect(`http://localhost:3000/?access_token=${tokens[1]}`);
    }

  }

}

