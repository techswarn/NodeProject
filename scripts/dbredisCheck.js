const { createClient } = require("redis");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const client = createClient({
  url: process.env.REDIS_URL,
  socket: {
   tls: true,
   rejectUnauthorized: true,
   cert: process.env.REDIS_CERT
 }
});

client.on("error", (err) => console.log("Redis Client Error", err));

const redisConnect = async () => {
  try {
    await client.connect();
    console.log("Redis connection successfull ");
  } catch (error) {
    console.log("Redis error:" + error);
  }
};
redisConnect();

const addvalue = async (data) => {
  data.value = 1
  await client.set("foo", data.value);
  const value = await client.get("foo");
  console.log(value);
  return value;
};

const checkRedis = async (data) => {
  const res = await addvalue(data);
  return res;
};

exports.checkRedis = checkRedis;
