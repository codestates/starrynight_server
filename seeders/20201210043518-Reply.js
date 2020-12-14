'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyComments = [];
    let dummyPhotoIdnUsers = 1;

    for (let i = 1; i <= 10; i++) {
      if (i % 3 === 0) {
        dummyPhotoIdnUsers = 1;
      } else {
        dummyPhotoIdnUsers = 2;
      }
      let commentData = {
        photoId: dummyPhotoIdnUsers,
        writerId: dummyPhotoIdnUsers,
        comment: `멋져요!! ${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dummyComments.push(commentData);
    }
    return queryInterface.bulkInsert('Replies', dummyComments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Replies', null, {});
  }
};
