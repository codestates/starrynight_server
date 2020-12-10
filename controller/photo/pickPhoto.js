const { User, Photo, Reply } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const { id } = req.body;
    const photoInfo = await Photo.findOne({ where: { hashtagId: id } });
    const commentUser = await Reply.findAll({ where: { photoId: id } });

    // commentUser 중복 제거한 뒤에 있는 유저들의 Nickname 뽑아오기 .. new Set?

    //console.log('사진 정보 : ', photoInfo);
    console.log('사진 댓글 정보 : ', commentUser[0]);

    res.sendStatus(200);
  }
};