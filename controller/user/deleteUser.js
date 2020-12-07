const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = {
  delete: async (req, res) => {
    const token = req.cookies.accessToken;
    const decode = jwt.verify(token, KEY);

    if (decode) {
      decode.exp = 0;
      const result = await User.destroy({ where: { id: decode.id } });

      if (result) {
        res.status(200).send('탈퇴가 완료되었습니다.');
      }
    }
  },
}