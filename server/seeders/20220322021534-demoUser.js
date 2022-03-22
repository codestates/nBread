'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('user', [{
        username: 'yangheeje',
        nickname: 'yang',
        password: 'test',
        picture: null,
        address: 'daejeon',
        phone_number: '01012345678'
      }, {
        username: 'test',
        nickname: 'test',
        password: 'test',
        picture: null,
        address: 'seoul',
        phone_number: '01087654321'
    }], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('user', null, {});

  }
};
