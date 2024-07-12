const fetch = require("node-fetch");

const checkEndpoint = async (req) => {
  console.log("here 2");

  fetch("https://api.telegram.org")
    .then((res) => res.text())
    .then((body) => console.log(body))
    .catch((err) => console.error("Fetch error:", err));

  // console.log(response);
  return true;
};

exports.checkEndpoint = checkEndpoint;
