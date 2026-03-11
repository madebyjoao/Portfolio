'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'admin',
        last_name: 'user',
        email: 'admin@mbjtest.com',
        password: '$2b$10$F4CO5j/jBINAXep4SPiGku3yfnQ8z3rhTojpo4SkbeINMysf.QVMa',
        role: 'ADMIN'
      },
      {
        first_name: 'client1',
        last_name: 'test',
        email: 'client1@mbjtest.com',
        password: '$2b$10$F4CO5j/jBINAXep4SPiGku3yfnQ8z3rhTojpo4SkbeINMysf.QVMa',
        role: 'CLIENT'
      },
      {
        first_name: 'client2',
        last_name: 'test',
        email: 'client2@mbjtest.com',
        password: '$2b$10$F4CO5j/jBINAXep4SPiGku3yfnQ8z3rhTojpo4SkbeINMysf.QVMa',
        role: 'CLIENT'
      },
      {
        first_name: 'client3',
        last_name: 'test',
        email: 'client3@mbjtest.com',
        password: '$2b$10$F4CO5j/jBINAXep4SPiGku3yfnQ8z3rhTojpo4SkbeINMysf.QVMa',
        role: 'CLIENT'
      },
      {
        first_name: 'client4',
        last_name: 'test',
        email: 'client4@mbjtest.com',
        password: '$2b$10$F4CO5j/jBINAXep4SPiGku3yfnQ8z3rhTojpo4SkbeINMysf.QVMa',
        role: 'CLIENT'
      }
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
