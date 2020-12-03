const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    console.log('hihi');

    const userData = await User.findOne({ where: { email, password } });

    try {
      if (userData === null) {
        res.status(404).send('이메일 또는 비밀번호가 잘못되었습니다.');
      } else {

        let token = jwt.sign(
          { id: userData.id },
          '2394gsdf',
          { expiresIn: '50m' }
        );

        res.cookie('user', token, {httpOnly: true, sameSite: 'none', secure: true});

        res.status(200).json({
		email : userData.email,
		userId : userData.userId,
		loginPlatformId : userData.loginPlatformId});
      }
    } catch (err) {
      res.sendStatus(500);
    }
  }
}
