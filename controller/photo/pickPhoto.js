const { User, Photo, Reply, HashTag, Favorite } = require('../../models');
const jwt = require('jsonwebtoken');
/**
 * 사진을 클릭했을때 
 *  header에 authorization || refreshToken 데이터가 있다면 true, 없다면 false
 *  조건을 기준으로 favorite 설정
 * 
 * Response {
 *  id : id
 *  photoPath : photoPath,
 *  photoTitle : photoTitle,
 *  writer : nickname,
 *  writer : profilePath,
 *  favorite : true or false,
 *  hashtags : [],
 *  replies : [
 *    {
 *      id : commentId,
 *      nickname : nickname,
 *      commenterProfilePath : profilePath
 *      comment : comment,
 *    } , ...
 *  ]
 * }
 */
module.exports = {
  get: async (req, res) => {
    const id = req.url.split('/')[1];
    const photoInfo = await Photo.findOne({ where: { id: id } }); // hasttagId를 id로 변경
    const commentId = await Reply.findAll({
      where: { photoId: id },
      attributes: ['commentId', 'comment']
    });

    let writer = await User.findOne({ where: { id: photoInfo.dataValues.userId } });
    let users = [];
    let datas = {};

    const hashtag = await HashTag.findAll({
      where: { photoId: id },
      attributes: ['subject']
    });

    // 타겟 사진에 댓글을 단 Users
    commentId.forEach(ele => {
      users.push(ele.commentId);
    });

    for (let i = 0; i < users.length; i++) {
      let user = await User.findOne({ where: { id: users[i] } });

      // 댓글에 해당 유저의 닉네임을 삽입
      commentId[i].dataValues['nickname'] = user.dataValues.nickname;
      commentId[i].dataValues['commenterProfilePath'] = user.dataValues.profilePath;
      commentId[i].dataValues['date'] = user.dataValues.createdAt;
    }

    datas = {
      id: photoInfo.dataValues.id,
      photoPath: photoInfo.dataValues.photoPath,
      photoTitle: photoInfo.dataValues.photoTitle,
      location: photoInfo.dataValues.location,
      writer: writer.dataValues.nickname,
      writerProfilePath: writer.dataValues.profilePath,
      hashtags: [...hashtag],
      replies: [...commentId]
    }

    // Favorite

    if (req.headers.authorization) {
      // 로그인한 유저가 선택한 사진에 좋아요를 클릭했는지 찾기
      const token = req.headers.authorization;
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      const isFavorite = await Favorite.findOne({ where: { id: id, pickerId: decode.id } });

      if (isFavorite === null || isFavorite.dataValues.favorite === false) {
        console.log('[FALSE] 마!! 왜 좋아요 안해주십니까!!');

        datas['favorite'] = false;
      } else {
        console.log('[TRUE] 마!! 좋아요 클릭했네!! 고맙습니다!!');

        datas['favorite'] = true;
      }

    } else {
      // 로그인하지 않은 사용자
      console.log('[FALSE] 마!! 로그인도 안했네!!! 해주세요!!');

      datas['favorite'] = false;
    }


    res.status(200).json(datas);
  }
};