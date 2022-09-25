const { Client } = require('pg')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const dbConnection = async () => {

    console.log("Hostname: " + process.env.PG_HOST)
    console.log("Database: " + process.env.PG_DATABASE)
    console.log("Port: " + process.env.PG_PORT)
    console.log("User: " + process.env.PG_USER)
    console.log("Password: " + process.env.PG_PASSWORD)

    let failure = null;

    const client = new Client({
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        ssl: {
          rejectUnauthorized: false
        }
    });

    await client.connect().catch((err) => failure = err );

    if (failure !== null) {
        console.log(failure)
    }

    const result = await client.query('SELECT * FROM company').catch(err => failure = err)
    client.end()

    return result   
}

exports.dbConnection = dbConnection

