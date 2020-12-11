const { User, Photo, Reply } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const { id } = req.body;
    const photoInfo = await Photo.findOne({ where: { id: id } }); // hasttagId를 id로 변경
    const commentId = await Reply.findAll({
      where: { photoId: id },
      attributes: ['commentId', 'comment']
    });

    let writer = await User.findOne({ where: { id: photoInfo.dataValues.userId } });
    let users = [];
    let datas = {};

    // 타겟 사진에 댓글을 단 Users
    commentId.forEach(ele => {
      users.push(ele.commentId);
    });

    for (let i = 0; i < users.length; i++) {
      let user = await User.findOne({ where: { id: users[i] } });

      // 댓글에 해당 유저의 닉네임을 삽입
      commentId[i].dataValues['nickname'] = user.dataValues.nickname;
    }

    datas = {
      id: photoInfo.dataValues.id,
      writer: writer.dataValues.nickname,
      wirterProfilePath: writer.dataValues.profilePath,

      replys: [...commentId]
    }

    res.status(200).json(datas);
  }
};