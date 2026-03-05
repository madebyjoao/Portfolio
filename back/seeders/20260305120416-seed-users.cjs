'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'admin',
        last_name: 'user',
        slug: "null",
        email: 'admin@mbjtest.com',
        password: '$2b$10$F4CO5j/jBINAXep4SPiGku3yfnQ8z3rhTojpo4SkbeINMysf.QVMa',
        role: 'ADMIN'
      },
      {
        first_name: 'client1',
        last_name: 'test',
        slug: 'slugclient1',
        email: 'client1@mbjtest.com',
        password: '$2b$10$F4CO5j/jBINAXep4SPiGku3yfnQ8z3rhTojpo4SkbeINMysf.QVMa',
        role: 'CLIENT'
      }
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
