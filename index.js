const app = require("./app");
const mongoose = require("mongoose");
const constants = require("./utils/constants");
const dotenv = require("dotenv");
const { createClient } = require("redis");

process.on("SIGKILL`", () => {
  console.log("SIGKILL signal received from process. Shutting down...");
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received from process. Shutting down...");
});

let DB;
dotenv.config({ path: "./config.env" });
console.log(process.env.NODE_ENV);
console.log("TESTING THE APP");

// if (process.env.NODE_ENV === "production") {
//   console.log("is production");
//   DB = process.env.DATABASE.replace(
//     "<password>",
//     process.env.DATABASE_PASSWORD
//   );
// } else {
//   console.log("is development");
//   DB = process.env.DATABASE.replace(
//     "<password>",
//     process.env.DATABASE_PASSWORD
//   );
// }

// //Initialize mongodb connection here
// console.log("Database string: " + DB);
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("MongoDB connections successful!"));

//Implement redis connection here


// const client = createClient({
//    url: process.env.REDIS_URL,
//    socket: {
//     tls: true,
//     rejectUnauthorized: false,
//     cert: process.env.REDIS_CERT
//   }
// });

// const redisConnect = async () => {
//   try {
//     await client.connect();
//     console.log("Redis connection successfull ");
//     await client.set("foo", "bar");
//     const value = await client.get("foo");
//     console.log(value); // returns 'bar'
//   } catch (error) {
//     console.log("Redis error:" + error);
//   }
// };

// redisConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT :: ${process.env.PORT}`);
});
