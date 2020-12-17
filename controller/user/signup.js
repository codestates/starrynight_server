const { User } = require('../../models');

const findOverlap = async function (email, nickname, mobile) {
  let bool = [];

  bool.push(await User.findOne({ where: { email: email } }));
  bool.push(await User.findOne({ where: { nickname: nickname } }));
  bool.push(await User.findOne({ where: { mobile: mobile } }));

	console.log(bool);

  for (let i = 0; i < bool.length; i++) {
    if (bool[i] !== null) {
      return false;
    }
  }
  return true;
}

module.exports = {
  post: async (req, res) => {
    const { email, nickname, mobile, password, loginPlatformId } = req.body;
	  let defaultProfilePath;
console.log(req.body);
     if(req.file) {
      defaultProfilePathe = req.file.location;
    } else {
      defaultProfilePath = process.env.DEFAULT_IMG;
    }

    if (!email || !nickname || !mobile || !password || !loginPlatformId) {
      res.status(422).send('정보를 다 입력해주세요');
    }

    let notOverlap = await findOverlap(email, nickname, mobile);
console.log(notOverlap);
    if (notOverlap === true) {
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

        try {
          res.status(201).json('회원가입이 완료되었습니다.');
        } catch (err) {
          res.sendStatus(500);
        }
      }

    } else {
      res.status(409).send('이미 존재하는 유저입니다.');
    }
  }
}
