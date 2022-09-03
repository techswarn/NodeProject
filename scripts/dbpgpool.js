const { Pool } = require('pg')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const dbpoolcon = async () => {

    console.log(process.env.PG_HOST_POOL)
    console.log(process.env.PG_DATABASE_POOL)
    console.log(process.env.PG_PORT_POOL)
    console.log(process.env.PG_USER_POOL)
    console.log(process.env.PG_PASSWORD_POOL)

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

    await pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res)
        pool.end()
    })
}

exports.dbpoolcon = async () => {
    console.log('Update PG db pool');
    await dbpoolcon()
}
