"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("portfolios", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      slug: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },

      title: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },

      about_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      about_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      cv_path: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      template_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      is_published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      template: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.createTable("projects", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      portfolio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "portfolios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      title: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      thumbnail: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      repo_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      live_url: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      is_public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      order_index: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.createTable("certificates", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      portfolio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "portfolios",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      image_path: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      issuer: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      issued_at: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      type: {
        type: Sequelize.ENUM("CERTIFICATE", "FORMATION"),
        allowNull: false,
        defaultValue: "CERTIFICATE",
      },

      is_public: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      order_index: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("portfolios", ["slug"], {
      unique: true,
      name: "portfolios_slug_unique",
    });

    await queryInterface.addIndex("projects", ["portfolio_id"], {
      name: "projects_portfolio_id_index",
    });

    await queryInterface.addIndex("certificates", ["portfolio_id"], {
      name: "certificates_portfolio_id_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("certificates");
    await queryInterface.dropTable("projects");
    await queryInterface.dropTable("portfolios");
  },
};