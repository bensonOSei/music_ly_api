import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let DATABASE_HOST=process.env.DATABASE_HOST
let DATABASE_USER=process.env.DATABASE_USER
let DATABASE_NAME=process.env.DATABASE_NAME
let DATABASE_PASSWORD=process.env.DATABASE_PASSWORD
let DATABASE_URL = process.env.DATABASE_URL || `mysql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_HOST}/${DATABASE_NAME}`


//'mysql://your_database_user:your_database_password@your_database_host:your_database_port/your_database_name'

const sequelize = new Sequelize(DATABASE_URL, {
	dialect: "mysql",
    logging: false
});


export { sequelize };
