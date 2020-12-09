const { User, Photo } = require("../../models");
const jwt = require("jsonwebtoken");
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    try {
      const { userToken, title, photoPath, location } = req.body;

      // Token을 decoding 한다
      let token = userToken;
      let decode = jwt.verify(token, KEY);
      console.log("**** Token Decode 정보 : ", decode);

      if (!photoPath || !title) {
        res.status(422).json({ success: false });
      }

      const newPhoto = await Photo.create({
        userId: decode,
        photoTitle: title,
        photoPath: photoPath,
        location: location,
      });
      res.status(201).json({ ...newPhoto, success: true });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  },
};
