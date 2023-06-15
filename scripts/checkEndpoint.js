const axios = require("axios");

const checkEndpoint = async () => {
  let data;
  try {
    const res = await axios.post(
      "",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    data = res;
  } catch (err) {
    console.log(err);
  }

  console.log(data);
  return data?.data;
};

exports.checkEndpoint = checkEndpoint;
