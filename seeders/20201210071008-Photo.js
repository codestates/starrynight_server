'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyPhotos = [];
    let dummyUser;

    // userId, photoTitle, hashtagId, photoPath, location
    for (let i = 1; i <= 30; i++) {
      if (i % 2 === 0) {
        dummyUser = 1;
      } else {
        dummyUser = 2;
      }

      let photoData = {
        userId: dummyUser,
        photoTitle: `Test Photo${i}`,
        photoPath: `https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/img${i}.jpg`,
        location: `한국의 어딘가 ${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dummyPhotos.push(photoData);
    }
    return queryInterface.bulkInsert('Photos', dummyPhotos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Photos', null, {});
  }
};
