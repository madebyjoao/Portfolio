import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Certificate = sequelize.define(
    "Certificate",
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
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        image_path: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },

        issuer: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },

        issued_at: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        type: {
            type: DataTypes.ENUM("CERTIFICATE", "FORMATION"),
            allowNull: false,
            defaultValue: "CERTIFICATE",
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
        tableName: "certificates",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        freezeTableName: true,
    },
);

export default Certificate;
