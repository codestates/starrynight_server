const { Photo, User } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  get: async (req, res) => {
    const token = req.headers.authorization;
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (decode) {
      const gallery = await Photo.findAll(
        {
          where: { userId: decode.id },
          attributes: ['id', 'photoPath']
        }
      )

      res.status(200).json(gallery);
    }
  },
}