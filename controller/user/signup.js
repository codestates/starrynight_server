const { User } = require("../../models");

const findOverlap = async function (...args) {
  let bool = [];

  bool.push(await User.findOne({ where: { email: args[0] } }));
  bool.push(await User.findOne({ where: { nickname: args[1] } }));
  bool.push(await User.findOne({ where: { mobile: args[2] } }));

  for (let i = 0; i < bool.length; i++) {
    // 정보가 있다면 중복이라는 의미
    if (bool[i] !== null) {
      return false;
    }
  }
  return true;
};

module.exports = {
  post: async (req, res) => {
    const { email, nickname, mobile, password, loginPlatformId } = req.body;
    let profilePath;
    console.log(req.file);
    console.log("회원가입 유저 정보 : ", req.body);
    if (req.file.location) {
      profilePath = req.file.location;
    } else {
      profilePath = process.env.DEFAULT_IMG;
    }

    if (!email || !nickname || !mobile || !password) {
      res.status(422).send("정보를 다 입력해주세요");
    }

    let notOverlap = await findOverlap(email, nickname, mobile);

    if (notOverlap === true) {
      const newUser = await User.findOrCreate({
        where: { email, nickname },
        defaults: {
          mobile: mobile,
          password: password,
          loginPlatformId: 1,
          profilePath: profilePath,
        },
      });

      if (newUser) {
        const [user, created] = newUser;

        try {
          res.status(201).json("회원가입이 완료되었습니다.");
        } catch (err) {
          res.sendStatus(500);
        }
      }
    } else {
      res.status(409).send("이미 존재하는 유저입니다.");
    }
  },
};
