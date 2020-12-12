'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let dummyLikes = [];
    let dummyUser;
    let favorite;

    for (let i = 1; i <= 10; i++) {
      if (i % 4 === 0) {
        dummyUser = 1;
        favorite = true;
      } else {
        dummyUser = 2;
        favorite = false;
      }

      // photoId, pickerId, favorite
      let favoriteData = {
        photoId: i,
        pickerId: dummyUser,
        favorite: favorite,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      dummyLikes.push(favoriteData);
    }
    return queryInterface.bulkInsert('Favorites', dummyLikes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};
