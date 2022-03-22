'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('recruitment_content', [{
      user_id: 1,
      address: 'daejeon',
      category_food: 1,
      delivery_fee: 1000,
      recruitment_personnel: 2,
      created_at: new Date(),
      restaurant_name: 'nene',
      body: 'come and join with me!',
      closed: 1
    }, {
      user_id: 2,
      address: 'seoul',
      category_food: 3,
      delivery_fee: 3000,
      recruitment_personnel: 3,
      created_at: new Date(),
      restaurant_name: '6th floor house',
      body: 'i like meat',
      closed: 1
  }], {});

},

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('recruitment_content', null, {});

  }
};
