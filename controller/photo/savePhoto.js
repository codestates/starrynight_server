const { Photo } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { userid, title, hashtag, photoPath, location } = req.body;

    if (!photoPath || !title) {
      res.status(422).send("반드시 사진과 제목이 있어야 합니다.");
    }

    const newPhoto = await Photo.create({
      userId: userid,
      photoTitle: title,

      // 모델 변경 필요
      hashtag: hashtag,
      photoPath: photoPath,
      location: location,
    });

    try {
      res.status(201).json({ ...newPhoto, success: true });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  },
};
