const app = require("./app")
const mongoose = require('mongoose');

const dotenv = require('dotenv')

dotenv.config({path: './config.env'})
console.log(process.env.DATABASE)
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
console.log(DB)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})