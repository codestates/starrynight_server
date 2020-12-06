const { User } = require('../../models');
const nodeMailer = require('nodemailer');

module.exports = {
  email: (req, res) => {
    // 연락처로 id로 이메일 찾기
    res.status(200).send('반가워요 :) 여기는 사용자 찾기 중 이메일 찾는 페이지입니다.');
  },

  password: async (req, res) => {
    const { email, mobile } = req.body;

    // 연락처와 이메일을 받아 저장된 DB와 비교
    const findUser = User.findOne({ where: { email: email, mobile: mobile } });

    if (findUser) {
      // 비밀번호를 변경(update)후 이메일로 변경된 비밀번호를 발송
      const updatePassword = User.update(
        { password: 1231 },
        { where: { id: findUser.id } }
      );

      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
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
          res.send(200).send('변경된 비밀번호를 저장된 메일로 전송했습니다.');
        }
      })
    }
  }
}