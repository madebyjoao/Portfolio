"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("portfolios", "full_name", {
      type: Sequelize.STRING(120),
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("portfolios", "position", {
      type: Sequelize.STRING(120),
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("portfolios", "region", {
      type: Sequelize.STRING(120),
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("portfolios", "full_name");
    await queryInterface.removeColumn("portfolios", "position");
    await queryInterface.removeColumn("portfolios", "region");
  },
};
