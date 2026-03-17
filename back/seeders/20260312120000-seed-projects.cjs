'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {

    const portfolios = await queryInterface.sequelize.query(
      `SELECT id, slug FROM portfolios;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const getPortfolioId = (slug) => portfolios.find(p => p.slug === slug)?.id;

    await queryInterface.bulkInsert('projects', [
      // Admin Portfolio Projects
      {
        portfolio_id: getPortfolioId('admin-user'),
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
        thumbnail: '/images/projects/ecommerce.jpg',
        repo_url: 'https://github.com/admin/ecommerce-platform',
        live_url: 'https://demo-ecommerce.example.com',
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('admin-user'),
        title: 'Task Management App',
        description: 'Modern task management application with real-time collaboration features. Built using React, Express, Socket.io, and MongoDB.',
        thumbnail: '/images/projects/taskmanager.jpg',
        repo_url: 'https://github.com/admin/task-manager',
        live_url: 'https://tasks.example.com',
        is_public: true,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('admin-user'),
        title: 'Weather Dashboard',
        description: 'Interactive weather dashboard showing real-time weather data and forecasts. Integrates with multiple weather APIs.',
        thumbnail: '/images/projects/weather.jpg',
        repo_url: 'https://github.com/admin/weather-dashboard',
        live_url: 'https://weather-dash.example.com',
        is_public: true,
        order_index: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Client 1 Portfolio Projects
      {
        portfolio_id: getPortfolioId('client1-test'),
        title: 'Portfolio Website',
        description: 'Personal portfolio website showcasing my work and skills. Built with React and modern CSS.',
        thumbnail: '/images/projects/portfolio.jpg',
        repo_url: 'https://github.com/client1/portfolio',
        live_url: 'https://client1.example.com',
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('client1-test'),
        title: 'Blog Platform',
        description: 'A minimalist blog platform with markdown support and comment system.',
        thumbnail: '/images/projects/blog.jpg',
        repo_url: 'https://github.com/client1/blog',
        live_url: 'https://blog-client1.example.com',
        is_public: true,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Client 2 Portfolio Projects
      {
        portfolio_id: getPortfolioId('client2-test'),
        title: 'Recipe Finder App',
        description: 'Mobile-first recipe finder application with ingredient search and meal planning features.',
        thumbnail: '/images/projects/recipe.jpg',
        repo_url: 'https://github.com/client2/recipe-finder',
        live_url: null,
        is_public: false,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('client2-test'),
        title: 'Fitness Tracker',
        description: 'Track your workouts, monitor progress, and achieve your fitness goals.',
        thumbnail: '/images/projects/fitness.jpg',
        repo_url: null,
        live_url: 'https://fitness.example.com',
        is_public: true,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Client 3 Portfolio Projects
      {
        portfolio_id: getPortfolioId('client3-test'),
        title: 'Chat Application',
        description: 'Real-time chat application with private messaging and group chats.',
        thumbnail: '/images/projects/chat.jpg',
        repo_url: 'https://github.com/client3/chat-app',
        live_url: 'https://chat-app.example.com',
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Client 4 Portfolio Projects
      {
        portfolio_id: getPortfolioId('client4-test'),
        title: 'Music Player',
        description: 'Custom music player with playlist management and audio visualization.',
        thumbnail: '/images/projects/music.jpg',
        repo_url: 'https://github.com/client4/music-player',
        live_url: null,
        is_public: true,
        order_index: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        portfolio_id: getPortfolioId('client4-test'),
        title: 'Budget Tracker',
        description: 'Personal finance management tool to track expenses and visualize spending patterns.',
        thumbnail: '/images/projects/budget.jpg',
        repo_url: 'https://github.com/client4/budget-tracker',
        live_url: 'https://budget.example.com',
        is_public: false,
        order_index: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
