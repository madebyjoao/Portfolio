'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      const q = (sql) =>
        queryInterface.sequelize.query(sql, { transaction: t });

      await q(`
        CREATE TABLE IF NOT EXISTS portfolios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          

          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);
      
      await q(`
        CREATE TABLE IF NOT EXISTS portfolio_champs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          

          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);

      await q(`
        CREATE TABLE IF NOT EXISTS projects (
          id INT AUTO_INCREMENT PRIMARY KEY,
          

          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);

      await q(`
        CREATE TABLE IF NOT EXISTS certificats (
          id INT AUTO_INCREMENT PRIMARY KEY,
          

          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);

    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      const q = (sql) =>
        queryInterface.sequelize.query(sql, { transaction: t });

      await q(`DROP TABLE portfolios;`);
      await q(`DROP TABLE portfolio_champs;`);
      await q(`DROP TABLE projects;`);
      await q(`DROP TABLE certificats;`);
      
    });
  },
};
