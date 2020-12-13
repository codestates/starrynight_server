const { Photo } = require("../../models");
const jwt = require("jsonwebtoken");
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    try {
      const { title, photoPath, location } = req.body;
      let token = req.headers.authorization;
      let decode = jwt.verify(token, KEY);
      console.log("**** Token Decode 정보 : ", decode);

      // 클라이언트가 제목, 경로, 위치 중 어느 하나라도 안보내오면 alert용 응답을 보낸다
      if (title === "" || photoPath === "" || location === "") {
        res.status(400).json({ success: false });
      } else {
        const newPhoto = await Photo.create({
          // userId: 1, // 테스트용
          userId: decode.id,
          photoTitle: title,
          photoPath: photoPath,
          location: location,
        });
        console.log(newPhoto);
        res.status(201).json({ ...newPhoto, success: true });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
