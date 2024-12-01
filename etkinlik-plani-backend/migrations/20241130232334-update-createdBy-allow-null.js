'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn("Events", "createdBy", {
          type: Sequelize.INTEGER,
          allowNull: true,
      });
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn("Events", "createdBy", {
          type: Sequelize.INTEGER,
          allowNull: false,
      });
  },
};

