const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const dbpoolcon = async () => {

    console.log("Hostname: " + process.env.PG_HOST_POOL)
    console.log("Database: " + process.env.PG_DATABASE_POOL)
    console.log("Port: " + process.env.PG_PORT_POOL)
    console.log("User: " + process.env.PG_USER_POOL)
//    console.log("Password: " + process.env.PG_PASSWORD_POOL)

    const pool = new Pool({
        user: process.env.PG_USER_POOL,
        host: process.env.PG_HOST_POOL,
        database: process.env.PG_DATABASE_POOL,
        password: process.env.PG_PASSWORD_POOL,
        port: process.env.PG_PORT_POOL,
        ssl: {
            rejectUnauthorized: false
        }
    })

    const result = await pool.query('SELECT * FROM company')
    await pool.end()
    return result   
}

exports.dbpoolcon = dbpoolcon