const { Photo, HashTag } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      const { hashtag, photoPath } = req.body;

      // 해시태그와 연관되는 사진을 findOne 한다
      const photo = await Photo.findOne({ where: { photoPath: photoPath } });

      // 입력된 해시태그들을 차례로 HashTags 테이블과 Photos 테이블에 모두 INSERT & UPDATE 한다
      for (let i = 0; i < hashtag.length - 1; i++) {
        let updates = await HashTag.create({
          subject: hashtag[i],
          photoId: photo.id,
        });
      }

      res.status(201).json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  },
};
