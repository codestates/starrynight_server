module.exports = {
  email: (req, res) => {
    res.status(200).send('반가워요 :) 여기는 사용자 찾기 중 이메일 찾는 페이지입니다.');
  },

  password: (req, res) => {
    res.status(200).send('반가워요 :) 여기는 사용자 찾기 중 비밀번호 찾는 페이지입니다.');
  }
}