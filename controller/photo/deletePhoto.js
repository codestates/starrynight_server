const { Photo } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  delete: (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.SECRET_KEY);
  },
}