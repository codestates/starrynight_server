const { Photo, User } = require("../../models");
const jwt = require("jsonwebtoken");

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
  get: async (req, res) => {
    const token = findAuthorized(res, req.headers.authorization, req.cookies.refreshToken);
    const decode = jwt.verify(token[0], process.env.SECRET_KEY);

    if (decode) {
      const gallery = await Photo.findAll({
        where: { userId: decode.id },
        attributes: ["id", "photoPath"],
      });

      let reverseGallery = gallery.reverse();

      if (token[1] === undefined) {
        res.status(200).json(reverseGallery);
      } else {
        res.status(200).json(reverseGallery, { accessToken: token[1] });
      }
    }
  },
};
