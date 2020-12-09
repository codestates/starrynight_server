const { Photo, HashTag } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      const { hashtag, photoPath } = req.body;

      // 먼저 Photo 테이블에 해당 해시태그 내용을 INSERT 한다
      const newHashtag = await HashTag.create({
        subject: hashtag,
      });

      // 만들어진 해시태그id를 Photo 테이블에 UPDATE 한다
      const addHashtag = await Photo.update(
        { hashtagId: newHashtag.id },
        { where: { photoPath: photoPath } }
      );

      res.status(201).json({ ...addHashtag, success: true });
    } catch (err) {
      res.status(500).json({ success: false });
    }
  },
};
