"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("portfolios", "font_navbar", {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("portfolios", "font_main", {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("portfolios", "font_footer", {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("portfolios", "font_navbar");
    await queryInterface.removeColumn("portfolios", "font_main");
    await queryInterface.removeColumn("portfolios", "font_footer");
  },
};
