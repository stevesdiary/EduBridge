'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add alterig commands here.
     * 
     * Example:
     * await queryiterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('modules', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      date_added: {
        type: Sequelize.STRING
      },
      resource_url: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('modules');
  }
}