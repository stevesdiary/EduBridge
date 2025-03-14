// 'use strict';

// const { DataType } = require('sequelize-typescript');

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add altering commands here.
//      *
//      * Example:
//      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
//      */
//     await queryInterface.createTable('profiles', {
//       id: {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         allowNull: false,
//         defaultValue: Sequelize.UUIDV4
//       },
//       // professional_interests: {
//       //   type: Sequelize.STRING,
//       //   allowNull: false,
//       // },
//       phone: {
//         type: Sequelize.STRING,
//       },
//       date_of_birth: {
//         type: Sequelize.DATE,
//       },
//       is_active: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: true
//       },
//       location: {
//         type: Sequelize.STRING,
//       },
//       user_id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         references: {
//           model: 'users',
//           key: 'id'
//         }
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//       },
//       deletedAt: {
//         type: Sequelize.DATE
//       }
//     });
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add reverting commands here.
//      *
//      * Example:
//      * await queryInterface.dropTable('users');
//      */
//     await queryInterface.dropTable('profiles');
//   }
// };
