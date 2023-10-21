const { createClient } = require("redis");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const checkRedis = async () => {
  let response = "";
  console.log("redis test");

  const client = await createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD,
  });
  const check = await client.connect();

  client.on("ready", () => {
    console.log("Connected!");

    response = "Successfully connected to resdis DB";
    return response;
  });

  client.on("error", (err) => console.log("Redis Server Error", err));
  // try {
  //
  //     console.log('Connected')
  // }catch(err){
  //     console.log(`Error while client.connect : ${err}`)
  // }
  // await client.set('foo', 'bar');
  // const res = await client.get('foo');
  // console.log(res)
};

exports.checkRedis = checkRedis;
