const { HashTag } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  patch: async (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const { hashtags, id } = req.body;

    for (let i = 0; i < hashtags.length; i++) {
      console.log(hashtags[i]);
    }

    if (decode) {
      //해당 사진에 기존 HashTag Subject가 있는지 Check

      for (let i = 0; i < hashtags.length; i++) {
        const findHashTag = await HashTag.findOrCreate({
          where: { subject: hashtags[i] },
          defaults: { photoId: id }
        });

        console.log(findHashTag);
      }

      //업데이트가 완료되었다면, 해당 사진의 이전 HashTag Subject를 찾아서 없앤다.
      const allHashTags = await HashTag.findAll({
        where: { photoId: id },
        attributes: ['subject']
      });

      console.log('모든 해시태그 : ', allHashTags);

      for (let i = 0; i < allHashTags.length; i++) {
        let savedSubject = hashtags.includes(allHashTags[i].dataValues.subject);
        //False라면 사진에 필요없는 Subject이므로 삭제
        if (!savedSubject) {
          let deleteTarget = HashTag.destroy({ where: { subject: allHashTags[i].dataValues.subject } });
        }
      };

      res.status(200).json(hashtags);
    } else {
      res.status(404).send('다시 시도 해주세요.');
    }
  },
}