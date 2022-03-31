'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('user', [{
        username: 'yangheeje',
        nickname: 'yang',
        password: 'test',
        picture: null,
        address: '부산 강서구 가덕해안로 3 (성북동)',
        phone_number: '01012345678'
      }, {
        username: 'test',
        nickname: 'test',
        password: 'test',
        picture: null,
        address: '서울특별시 서초구 서초대로74길 11',
        phone_number: '01087654321'
    }], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('user', null, {});

  }
};
