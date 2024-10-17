const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const sequelize = new Sequelize(process.env.DB_URL_MYSQL) 

const dbmysqlSequelizeCheck = async () => {

    if(process.env.DEBUG) {
        console.log("URL: " + process.env.DB_URL_MYSQL)
    }
    

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }



    return "DB connection check"
}

exports.dbmysqlSequelizeCheck = dbmysqlSequelizeCheck

