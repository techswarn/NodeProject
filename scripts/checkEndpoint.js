const axios = require("axios");
const dotenv = require("dotenv");
const { writeFileSync } = require("fs");
dotenv.config({ path: "./config.env" });

const checkEndpoint = async (req) => {
  const url = "https://epochcms-ahdv4.ondigitalocean.app/api/blogs";
  let response;
  console.log(response.status);
  try {
    response = await axios.get(url);
  } catch (error) {
    console.error(error);
  }
  // console.log(response);
  if (response.status == 200) {
    return true;
  } else if (response.status == 500) {
    return false;
  }
};

exports.checkEndpoint = checkEndpoint;
