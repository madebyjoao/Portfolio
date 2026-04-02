"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("project_images", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },

            project_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "projects",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            image_path: {
                type: Sequelize.STRING(255),
                allowNull: false,
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
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("project_images");
    },
};
