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
          user_id INT NOT NULL,
          

          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);
      
      await q(`
        CREATE TABLE IF NOT EXISTS portfolio_champs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          portfolio_id INT NOT NULL,
          about_title VARCHAR(255) NOT NULL,
          about_text VARCHAR(255) NOT NULL,

          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);

      await q(`
        CREATE TABLE IF NOT EXISTS projects (
          id INT AUTO_INCREMENT PRIMARY KEY,
          portfolios_id INT NOT NULL,
          thumbnail VARCHAR(255),
          title VARCHAR(50),
          description VARCHAR(255),          

          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB;
      `);

      await q(`
        CREATE TABLE IF NOT EXISTS certificats (
          id INT AUTO_INCREMENT PRIMARY KEY,
          portfolio_id INT NOT NULL,
          certificats_path VARCHAR(255),
          certificats_info VARCHAR(255),          

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
