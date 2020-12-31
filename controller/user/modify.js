const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

function findAuthorized(res, acc, ref) {
  // 모든 토큰이 없을 경우
  if (!acc && !ref) {
    res.status(401).send('다시 로그인 해주세요');
  } else {
    if (acc) {
      return [acc];
    } else {
      // Access Token 재생성
      let accessToken = jwt.sign(
        { id: id },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );

      return [ref, accessToken];
    }
  }
}

module.exports = {
  nickname: async (req, res) => {
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
    const decode = jwt.verify(token[0], KEY);
    const { nickname } = req.body;

    const overlapNickname = await User.findOne({ where: { nickname: nickname } });

    // 찾을 수 없다면 null이 나온다.
    if (!overlapNickname) {
      const modifyNickname = await User.update(
        { nickname: nickname },
        { where: { id: decode.id } }
      );

      if (token[1] === undefined) {
        res.status(200).json({ nickname: nickname });
      } else {
        res.status(200).json({ nickname: nickname, accessToken: token[1] });
      }
    } else {
      res.status(404).send('이미 존재하는 별명입니다.');
    }
  },

  password: async (req, res) => {
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
    const decode = jwt.verify(token[0], KEY);
    const { password } = req.body;

    const modifyPassword = await User.update(
      { password: password },
      { where: { id: decode.id } }
    );

    if (modifyPassword) {
      if (token[1] === undefined) {
        res.status(200).send('비밀번호가 변경되었습니다.');
      } else {
        res.status(200).json({ accessToken: token[1] });
      }
    } else {
      res.status(404).send('다시 시도해 주세요.');
    }
  },

  mobile: async (req, res) => {
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
    const decode = jwt.verify(token[0], KEY);
    const { mobile } = req.body;

    const overlapMobile = await User.findOne({ where: { mobile: mobile } });


    if (!overlapMobile) {
      const modifyMobile = await User.update(
        { mobile: mobile },
        { where: { id: decode.id } }
      );

      if (token[1] === undefined) {
        res.status(200).json({ mobile: mobile });
      } else {
        res.status(200).json({ mobile: mobile, accessToken: token[1] });
      }
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
        if (token[1] === undefined) {
          res.status(200).json({ profilePath: req.file.location });
        } else {
          res.status(200).json({ profilePath: req.file.location, accessToken: token[1] });
        }
      } else {
        res.status(404).send('유효하지 않은 사진입니다.');
      }
    }
  },
}
