const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

function findAuthorized(res, acc, ref) {
  // 모든 토큰이 없을 경우
  if (!acc && !ref) {
    res.status(401).send('다시 로그인 해주세요');
  } else {
    if (acc) {
      return acc;
    } else {
      return ref;
    }
  }
}

module.exports = {
  nickname: async (req, res) => {
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
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
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
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
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
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

  profile: async (req, res) => {
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
    const decode = jwt.verify(token, KEY);

    if (decode) {
      const modifyProfile = await User.update(
        { profilePath: req.file.location },
        { where: { id: decode.id } }
      );

      if (modifyProfile) {
        res.status(200).json({ profilePath: req.file.location });
      } else {
        res.status(404).send('유효하지 않은 사진입니다.');
      }
    }
  },
}
