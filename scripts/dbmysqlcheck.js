const mysql = require("mysql");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config({ path: "./config.env" });

let failure = null;
const sslFilePath = `${__dirname}/../assets/ca-certificate.crt`;
console.log(sslFilePath);
console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_DATABASE);

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  ssl: {
    ca: fs.readFileSync(sslFilePath),
  },
});

connection.connect((err) => {
  if (err) {
    console.log("Connection error: " + err);
    failure = err;
    return;
  }
});

// const mysqlDbConnect = async () => {
//   let result;
//   // try {
//   //   row = await connection.query("select * from listings");
//   //   console.log(row);
//   //   return row;
//   // } catch (err) {
//   //   console.log("query error: " + err);

//   connection.query("select * from listings", function (error, results, fields) {
//     if (error) throw error;
//     result = results;
//   });
//   return result;
// };

const mysqlDbConnect = async () => {
  let result;
  connection.query("select * from listings", function (error, results, fields) {
    if (error) throw error;
    result = results;
  });
  return result;
};

exports.mysqlDbConnect = mysqlDbConnect;
