const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const dbknexcon = async () => {

    if(process.env.DEBUG) {
        console.log(process.env.MYSQL_HOST)
        console.log(process.env.MYSQL_PASSWORD)
        console.log(process.env.MYSQL_USER)
        console.log(process.env.MYSQL_DATABASE)
    }

    const knex = require('knex')({
        client: 'mysql',
        connection: {
          host : process.env.MYSQL_HOST,
          port : process.env.MYSQL_PORT,
          user : process.env.MYSQL_USER,
          password : process.env.MYSQL_PASSWORD,
          database : process.env.MYSQL_DATABASE
        }
    });

    let data;

    try {
        data = await knex.select().from('student')
    } catch(err) {
        console.log(err)
    }

    return data
}

exports.dbknexcon = dbknexcon

