const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = {
  nickname: async (req, res) => {
    const token = req.cookies.accessToken;
    const decode = jwt.verify(token, KEY);
    const { nickname } = req.body;

    const modifyNickname = await User.update(
      { nickname: nickname },
      { where: { id: decode.id } }
    );

    if (modifyNickname) {
      res.status(200).json({ nickname: nickname });
    } else {
      res.status(404).send('이미 존재하는 별명입니다.');
    }
  },

  password: async (req, res) => {
    const token = req.cookies.accessToken;
    const decode = jwt.verify(token, KEY);
    const { password } = req.body;

    const modifyPassword = await User.update(
      { password: password },
      { where: { id: decode.id } }
    );

    if (modifyPassword) {
      res.status(200).send('비밀번호가 변경되었습니다.');
    }
  },

  mobile: async (req, res) => {
    const token = req.cookies.accessToken;
    const decode = jwt.verify(token, KEY);
    const { mobile } = req.body;

    const modifyMobile = await User.update(
      { mobile: mobile },
      { where: { id: decode.id } }
    );

    if (modifyMobile) {
      res.status(200).json({ mobile: mobile });
    } else {
      res.status(404).send('이미 존재하는 연락처입니다.');
    }
  },

  profile: (req, res) => {
    res.status(200).send('반가워요 :) 여기는 프로필 수정 페이지입니다.');
  },
}