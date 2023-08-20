import { sequelize } from "../connection.mjs";
import { DataTypes } from "sequelize";

export const Spotify = sequelize.define("spotify", {
    client_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client_secret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    initiated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    expires_in: {
        type: DataTypes.DATE,
        allowNull: false
    }
})