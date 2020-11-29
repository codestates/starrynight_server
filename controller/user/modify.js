module.exports = {
  nickname: (req, res) => {
    res.status(200).send('반가워요 :) 여기는 이름 수정 페이지입니다.');
  },

  password: (req, res) => {
    res.status(200).send('반가워요 :) 여기는 비밀번호 수정 페이지입니다.');
  },

  mobile: (req, res) => {
    res.status(200).send('반가워요 :) 여기는 연락처 수정 페이지입니다.');
  },

  profile: (req, res) => {
    res.status(200).send('반가워요 :) 여기는 프로필 수정 페이지입니다.');
  },
}