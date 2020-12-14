'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyUsers = [];

    for (let i = 1; i <= 5; i++) {
      let userData = {
        nickname: `Dummy${i}`,
        email: `user${i}@gmail.com`,
        password: `1231`,
        profilePath: `logologo`,
        loginPlatformId: `1`,
        refreshToken: `test`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dummyUsers.push(userData);
    }
    return queryInterface.bulkInsert('Users', dummyUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
