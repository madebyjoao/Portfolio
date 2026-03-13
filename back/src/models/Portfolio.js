import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Portfolio = sequelize.define(
  "Portfolio",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9-]+$/i,
        len: [3, 50],
      },
    },

    title: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },

    about_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    about_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    cv_path: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    template: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    is_published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "portfolios",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export default Portfolio;