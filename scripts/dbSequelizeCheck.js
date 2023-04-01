const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const sequelize = new Sequelize(process.env.DB_URL_PG) 

const dbSequelizeCheck = async () => {

    if(process.env.DEBUG) {
        console.log("Hostname: " + process.env.DB_URL_PG)
    }
    

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }



    return "DB connection check"
}

exports.dbSequelizeCheck = dbSequelizeCheck

