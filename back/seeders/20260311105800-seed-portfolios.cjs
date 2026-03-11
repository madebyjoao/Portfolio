'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {

    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM users;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const getUserId = (email) => users.find(u => u.email === email)?.id;

    await queryInterface.bulkInsert('portfolios', [
      {
        user_id: getUserId('admin@mbjtest.com'),
        slug: 'admin-user',
        title: 'Admin Portfolio',
        about_title: 'About Me',
        about_text: 'Administrator portfolio for testing.',
        template_id: 1,
        is_published: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: getUserId('client1@mbjtest.com'),
        slug: 'client1-test',
        title: 'Client 1 Portfolio',
        about_title: 'About Me',
        about_text: 'Portfolio of client 1.',
        template_id: 1,
        is_published: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: getUserId('client2@mbjtest.com'),
        slug: 'client2-test',
        title: 'Client 2 Portfolio',
        about_title: 'About Me',
        about_text: 'Portfolio of client 2.',
        template_id: 1,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: getUserId('client3@mbjtest.com'),
        slug: 'client3-test',
        title: 'Client 3 Portfolio',
        about_title: 'About Me',
        about_text: 'Portfolio of client 3.',
        template_id: 1,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: getUserId('client4@mbjtest.com'),
        slug: 'client4-test',
        title: 'Client 4 Portfolio',
        about_title: 'About Me',
        about_text: 'Portfolio of client 4.',
        template_id: 1,
        is_published: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('portfolios', null, {});
  }
};