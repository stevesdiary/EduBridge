'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      },
      available_offline: {
        type: Sequelize.BOOLEAN
      },
      category: {
        type: Sequelize.STRING
      },
      difficulty_level: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      transcription: {
        type: Sequelize.TEXT
      },
      instructor: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      resource_url: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('courses');
  }
};
