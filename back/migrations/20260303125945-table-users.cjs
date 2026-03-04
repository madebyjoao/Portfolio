'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      const q = (sql) =>
        queryInterface.sequelize.query(sql, { transaction: t });

      await q(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          slug VARCHAR(50) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role ENUM('ADMIN','CLIENT') NOT NULL DEFAULT 'CLIENT',

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

      await q(`DROP TABLE users;`);
      
    });
  },
};
