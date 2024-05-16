require('dotenv').config()
const { Sequelize } = require('sequelize');

const user = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, user,DB_PASSWORD, {
    host: DB_HOST, 
    port: DB_PORT, 
    dialect: 'postgres',
    timezone: '-06:00',
    dialectOptions: {
        useUTC: false,
        timezone: '-06:00',
    },
});

module.exports = sequelize;