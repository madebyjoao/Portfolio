import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Project = sequelize.define(
    "Project",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        portfolio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        thumbnail: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        repo_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: { isUrl: true },
        },

        live_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: { isUrl: true },
        },

        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

        order_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "projects",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        freezeTableName: true,
    },
);

export default Project;
