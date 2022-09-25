const mysql = require('mysql');
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config({path: './config.env'})

const mysqlDbConnect = async () => {

    let failure = null;
    const sslFilePath = `${__dirname}/../assets/ca-certificate.crt`
    console.log(sslFilePath)
    console.log(process.env.MYSQL_HOST)
    console.log(process.env.MYSQL_PASSWORD)
    console.log(process.env.MYSQL_USER)
    console.log(process.env.MYSQL_DATABASE)

    const connection = mysql.createConnection({
        host     : process.env.MYSQL_HOST,
        user     : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE,
        port     : process.env.MYSQL_PORT,
        ssl  : {
            ca : fs.readFileSync(sslFilePath)
        }
    });

    await connection.connect((err)=>{
        if(err){
            console.log("Connection error: " + err)
            failure = err
            return;
        }
    })
    let row;
    connection.query("select * from student", (err, result, fields) => {
        if(err){
            console.log('err in query: ' + err)
        }

        console.log(result)
        row = result
    });
   
    // try {
    //     row = await connection.query( 'select * from student' );
    // } catch ( err ) {
    //     console.log('query error: ' + err)
    // }
    // console.log(row)
    return row
}

exports.mysqlDbConnect = mysqlDbConnect