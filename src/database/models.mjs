import { DataTypes } from 'sequelize'
import { sequelize } from './connection.mjs'


export const user = sequelize.define('user', {
    firstName: {
        type:DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timestamps: true,
    imagePath: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

