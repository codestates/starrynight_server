const { User } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { email, nickname, mobile, password, profilePath, loginPlatformId } = req.body;

    if (!email || !nickname || !mobile || !password || !loginPlatformId) {
      res.status(422).send('정보를 다 입력해주세요');
    }

   
    const defaultProfilePath= process.env.DEFAULT_IMG;
   

    const newUser = await User
      .findOrCreate({
        where: { email, nickname },
        defaults: {
          mobile: mobile,
          password: password,
          loginPlatformId: 1,
          profilePath: defaultProfilePath
        }
      });

    if (newUser) {
      const [user, created] = newUser;

      if (!created) {
        res.status(409).send('이미 존재하는 유저입니다.');
      }

      try {
        res.status(201).json('회원가입이 완료되었습니다.');
      } catch (err) {
        res.sendStatus(500);
      }
    }
  }
}
