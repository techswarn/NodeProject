const {Client} = require('pg')
const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const dbCon = async() => {
  console.log(process.env.PG_HOST)
  console.log(process.env.PG_DATABASE)
  console.log(process.env.PG_PORT)
  console.log(process.env.PG_USER)
  console.log(process.env.PG_PASSWORD)

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

  let failure = null;

    await client.connect()
    .catch((err) => failure = err );

  if (failure !== null) {
    console.log(`Response: ${failure}`)
    return {body: failure};
  }

//  const response = await client.query('CREATE TABLE company (user_id serial PRIMARY KEY, username VARCHAR(55) NOT NULL, age INT NOT NULL)')
//    .catch(reason => failure = reason);
  //  const response = await client.query("INSERT INTO company (user_id, username, age) VALUES (2, 'john doe', 34)")
  //  .catch(reason => failure = reason);
    const response = await client.query("SELECT * FROM company")
    .catch(reason => failure = reason);

  await client.end();

  const body = failure === null ? JSON.stringify(response.rows) : failure.toString();

  console.log(`Response: ${body}`)

  return {body};
}


exports.dbCon = () => {
        console.log('Update PG db');
        dbCon()
}

