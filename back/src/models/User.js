import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "CLIENT"),
      allowNull: false,
      defaultValue: "CLIENT",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export default User;
