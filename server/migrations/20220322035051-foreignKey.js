'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    // await queryInterface.addColumn('recruitment_content', 'user_id', Sequelize.INTEGER)
    // await queryInterface.addColumn('user_content', 'user_id', Sequelize.INTEGER)
    // await queryInterface.addColumn('user_content', 'content_id', Sequelize.INTEGER)

    await queryInterface.addConstraint('recruitment_content', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_recruitment_content_user_id',
      references: {
        table: 'user',
        field: 'id'
      },
      onDelete: 'cascade'
    })

    await queryInterface.addConstraint('user_content', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_user_content_user_id',
      references: {
        table: 'user',
        field: 'id'
      },
      onDelete: 'cascade'
    })
    
    await queryInterface.addConstraint('user_content', {
      fields: ['content_id'],
      type: 'foreign key',
      name: 'FK_user_content_content_id',
      references: {
        table: 'recruitment_content',
        field: 'id'
      },
      onDelete: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.removeConstraint('recruitment_content', 'FK_recruitment_content_user_id')
     await queryInterface.removeConstraint('user_content', 'FK_user_content_user_id')
     await queryInterface.removeConstraint('user_content', 'FK_user_content_content_id')
    //  await queryInterface.removeColumn('recruitment_content', 'user_id')
    //  await queryInterface.removeColumn('user_content', 'user_id')
    //  await queryInterface.removeColumn('user_content', 'content_id')
  }
};
