const { User } = require('../../models');
const nodeMailer = require('nodemailer');
const PASS = process.env.PASS;
const USER = process.env.USER;

module.exports = {
  email: async (req, res) => {
    // 연락처로 id로 이메일 찾기
    const { mobile } = req.body;
    const findUser = await User.findOne({
      where: { mobile: mobile },
      attributes: ['email', 'createdAt']
    });


    console.log(`${findUser.createdAt.getFullYear()}.${findUser.createdAt.getMonth()}.${findUser.createdAt.getDate()}`);

    if (findUser) {
      res.status(200).json({
        email: findUser.email,
        createdAt: `${findUser.createdAt.getFullYear()}.${findUser.createdAt.getMonth()}.${findUser.createdAt.getDate()}`
      });
    } else {
      res.status(404).send('연락처를 정확히 입력해주세요.');
    }
  },

  password: async (req, res) => {
    const { email, mobile } = req.body;

    // 연락처와 이메일을 받아 저장된 DB와 비교
    const findUser = await User.findOne({ where: { email: email, mobile: mobile } });

    if (findUser) {
      // 비밀번호를 변경(update)후 이메일로 변경된 비밀번호를 발송
      const updatePassword = await User.update(
        { password: 1231 },
        { where: { id: findUser.id } }
      );

      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'team2.starrynight@gmail.com',
          pass: PASS,
        }
      });

      const mailOptions = {
        from: process.env.USER,
        to: findUser.email,
        subject: '[Starry Night] 비밀번호 찾기에 대한 메일입니다.',
        text: '비밀번호가 : 1231 로 변경되었습니다.'
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          res.send(200).send('가입하신 이메일로 임시 비밀번호를 전송합니다.');
        }
      });
    } else {
      res.status(404).send('일치하는 사용자가 없습니다.');
    }
  }
}