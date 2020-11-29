const { User } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const userData = await User.findOne({ where: { email, password } });

    try {
      if (userData === null) {
        res.status(404).send('이메일 또는 비밀번호가 잘못되었습니다.');
      } else {
        req.session.userid = userData.id;
        res.status(200).json('로그인을 하였습니다.');
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
}