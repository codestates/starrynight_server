const { User } = require('../../models');

module.exports = {
  info: async (req, res) => {
    /**
     * Mypage API To do
     * 1. 사용자의 '쿠키' 또는 '토큰'을 받아 사용자의 id를 확인한다.
     *  1-1. 만약 '쿠키', '토큰'이 없다면 ...
     * 2. 사용자의 id로 User Table에 사용자의 정보를 가져온다.
     * 3. 사용자 비밀번호는는 보안을 위해 전달하지 않는다.
     *   3-1. 비밀번호 변경은 [현재 비밀번호], [변경할 비밀번호], [변경할 비밀번호 다시 입력]으로 진행한다.
     */

    // Test
    const { userId } = req.body;

    // Production
    //const userId = req.session.userId;


    if (userId) {
      let userData = await User.findOne({ where: { id: userId } });

      if (userData) {
        res.status(200).json({
          email: userData.email,
          password: '******',
          nickname: userData.nickname,
          mobile: userData.mobile,
          profilePath: userData.profilePath
        });
      } else {
        res.status(204).send(err);
      }
    }
  }
}
