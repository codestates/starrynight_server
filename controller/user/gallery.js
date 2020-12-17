const { Photo, User } = require("../../models");
const jwt = require("jsonwebtoken");

function findAuthorized(res, acc, ref) {
  // 모든 토큰이 없을 경우
  if (!acc && !ref) {
    res.status(401).send("다시 로그인 해주세요");
  } else {
    if (acc) {
      return acc;
    } else {
      return ref;
    }
  }
}

module.exports = {
  get: async (req, res) => {
    const token = findAuthorized(
      res,
      req.headers.authorization,
      req.cookies.refreshToken
    );
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (decode) {
      const gallery = await Photo.findAll({
        where: { userId: decode.id },
        attributes: ["id", "photoPath"],
      });

      let reverseGallery = gallery.reverse();

      res.status(200).json(reverseGallery);
    }
  },
};
