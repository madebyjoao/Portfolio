'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {

    const portfolios = await queryInterface.sequelize.query(
      `SELECT id, slug FROM portfolios;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const getPortfolioId = (slug) => portfolios.find(p => p.slug === slug)?.id;

    await queryInterface.bulkInsert('certificates', [
      // Admin Portfolio Certificates
      {
        portfolio_id: getPortfolioId('admin-user'),
        title: 'AWS Certified Solutions Architect',
        description: 'Professional certification demonstrating expertise in designing distributed systems on AWS.',
        image_path: '/images/certificates/aws-architect.jpg',
        issuer: 'Amazon Web Services',
        issued_at: '2025-06-15',
        type: 'CERTIFICATE',
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('admin-user'),
        title: 'Full Stack Web Development',
        description: 'Comprehensive program covering modern web development technologies and best practices.',
        image_path: '/images/certificates/fullstack.jpg',
        issuer: 'Udacity',
        issued_at: '2024-12-20',
        type: 'FORMATION',
        is_public: true,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('admin-user'),
        title: 'Certified Kubernetes Administrator',
        description: 'Certification validating skills in deploying and managing Kubernetes clusters.',
        image_path: '/images/certificates/cka.jpg',
        issuer: 'The Linux Foundation',
        issued_at: '2025-03-10',
        type: 'CERTIFICATE',
        is_public: true,
        order_index: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Client 1 Portfolio Certificates
      {
        portfolio_id: getPortfolioId('client1-test'),
        title: 'React Developer Certification',
        description: 'Advanced React certification covering hooks, context, and performance optimization.',
        image_path: '/images/certificates/react.jpg',
        issuer: 'Meta',
        issued_at: '2025-01-15',
        type: 'CERTIFICATE',
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('client1-test'),
        title: 'JavaScript Algorithms and Data Structures',
        description: 'In-depth course on algorithms, data structures, and problem-solving.',
        image_path: '/images/certificates/javascript.jpg',
        issuer: 'freeCodeCamp',
        issued_at: '2024-09-20',
        type: 'FORMATION',
        is_public: true,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Client 2 Portfolio Certificates
      {
        portfolio_id: getPortfolioId('client2-test'),
        title: 'Mobile App Development',
        description: 'Complete mobile development course covering React Native and Flutter.',
        image_path: '/images/certificates/mobile.jpg',
        issuer: 'Coursera',
        issued_at: '2025-02-10',
        type: 'FORMATION',
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('client2-test'),
        title: 'UX/UI Design Fundamentals',
        description: 'Foundation in user experience design principles and interface design.',
        image_path: '/images/certificates/uxui.jpg',
        issuer: 'Google',
        issued_at: '2024-11-05',
        type: 'CERTIFICATE',
        is_public: false,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Client 3 Portfolio Certificates
      {
        portfolio_id: getPortfolioId('client3-test'),
        title: 'Node.js Application Development',
        description: 'Professional Node.js development covering advanced patterns and best practices.',
        image_path: '/images/certificates/nodejs.jpg',
        issuer: 'OpenJS Foundation',
        issued_at: '2025-01-25',
        type: 'CERTIFICATE',
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('client3-test'),
        title: 'Database Design and SQL',
        description: 'Advanced database design, optimization, and SQL programming.',
        image_path: '/images/certificates/database.jpg',
        issuer: 'Stanford Online',
        issued_at: '2024-10-15',
        type: 'FORMATION',
        is_public: true,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Client 4 Portfolio Certificates
      {
        portfolio_id: getPortfolioId('client4-test'),
        title: 'Python for Data Science',
        description: 'Comprehensive Python programming for data analysis and machine learning.',
        image_path: '/images/certificates/python.jpg',
        issuer: 'IBM',
        issued_at: '2024-08-30',
        type: 'FORMATION',
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('client4-test'),
        title: 'Cybersecurity Fundamentals',
        description: 'Introduction to cybersecurity concepts, threats, and defense strategies.',
        image_path: '/images/certificates/security.jpg',
        issuer: 'CompTIA',
        issued_at: '2025-02-28',
        type: 'CERTIFICATE',
        is_public: true,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('certificates', null, {});
  }
};
