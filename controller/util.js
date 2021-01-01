const jwt = require('jsonwebtoken');

function findAuthorized(res, acc, ref) {
  if (!acc && !ref) {
    res.status(401).send('다시 로그인 해주세요');
  } else {
    if (acc) {
      return [acc];
    } else {
      // Access Token 재생성
      const decode = jwt.verify(res, process.env.SECRET_KEY);

      let accessToken = jwt.sign(
        { id: id },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
      );

      return [ref, accessToken];
    }
  }
}

exports.findAuthorized = findAuthorized;