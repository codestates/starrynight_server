'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyHashtags = [];

    for (let i = 1; i <= 10; i++) {
      // subject, photoId
      let hastagData = {
        subject: `어딘가${i}`,
        photoId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dummyHashtags.push(hastagData);
    }
    return queryInterface.bulkInsert('HashTags', dummyHashtags, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('HashTags', null, {});
  }
};
