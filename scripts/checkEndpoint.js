const axios = require("axios");
const dotenv = require("dotenv");
const { writeFileSync } = require("fs");
dotenv.config({ path: "./config.env" });

const checkEndpoint = async (req) => {
  const num = Math.floor(Math.random() * 10);
  console.log(num);
  if (num > 7) {
    return true;
  } else {
    return false;
  }
};

exports.checkEndpoint = checkEndpoint;
