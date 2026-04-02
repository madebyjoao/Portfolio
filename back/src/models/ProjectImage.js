import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const ProjectImage = sequelize.define(
    "ProjectImage",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        image_path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        order_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: "project_images",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default ProjectImage;
