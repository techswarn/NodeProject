const app = require("./app")
const mongoose = require('mongoose');
const constants = require('./utils/constants')
const dotenv = require('dotenv')

let DB;
dotenv.config({path: './config.env'})
console.log(process.env.NODE_ENV)
console.log("TESTING THE APP")
if(process.env.NODE_ENV === "production") {
  console.log("is production")
  console.log(process.env.DATABASE_PASSWORD) 
  console.log(process.env.DB_STRING)
  
  DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  )
  console.log(DB)

} else {
  DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
  console.log(DB)
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})