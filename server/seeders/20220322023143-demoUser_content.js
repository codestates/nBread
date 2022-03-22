'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('user_content', [{
      user_id: 1,
      content_id: 1
    }, {
      user_id: 2,
      content_id: 2
    }], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('user_content', null, {});

  }
};
