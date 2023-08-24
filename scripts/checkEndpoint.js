const axios = require("axios");
const dotenv = require("dotenv");
const { writeFileSync } = require("fs");
dotenv.config({ path: "./config.env" });

const checkEndpoint = async (req) => {
  const url =
    "https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-0b0f94ea-326e-434f-a6db-e297bf02f150/webinvoke/invoke";
  let response;
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
