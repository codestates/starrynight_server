module.exports = {
  signin: require('./signin'),
  signup: require('./signup'),
  signout: require('./signout'),
  findUser: require('./findUser'),  // email, password
  mypage: require('./mypage'),
  modify: require('./modify'),  // nickname, password, mobile, profile
  deleteUser: require('./deleteUser'),
  gallery: require('./gallery'),
  favorite: require('./favorite'),
};