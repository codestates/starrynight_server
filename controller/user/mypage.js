const { User } = require('../../models');
const { findAuthorized } = require('../util');

const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = {
  info: async (req, res) => {
    // Production
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
    const decode = jwt.verify(token[0], KEY);

    if (decode) {
      let result;
      let userData = await User.findOne({ where: { id: decode.id } });

      if (userData) {
        result = {
          email: userData.email,
          password: '******',
          nickname: userData.nickname,
          mobile: userData.mobile,
          profilePath: userData.profilePath,
          loginPlatformId: userData.loginPlatformId,
        }

        if (token[1] === undefined) {
          // AccessToken이 기존에 있음!
          res.status(200).json(result);
        } else {
          result['accessToken'] = token[1];
          res.status(200).json(result);
        }
      } else {
        res.status(204).send(err);
      }
    }
  }
}
