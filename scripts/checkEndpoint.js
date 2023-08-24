const axios = require("axios");
const dotenv = require("dotenv");
const { writeFileSync } = require("fs");
dotenv.config({ path: "./config.env" });

const checkEndpoint = async (req) => {
  console.log(process.env.DEBUG);
  const status = process.env.DEBUG;
  if (status == 1) {
    data = true;
  } else {
    data = false;
  }
  console.log(data);
  return data;
};

exports.checkEndpoint = checkEndpoint;
