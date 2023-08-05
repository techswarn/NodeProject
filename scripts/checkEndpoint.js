const axios = require("axios");
const { writeFileSync } = require("fs");

const checkEndpoint = async () => {
  let data;
  try {
    const path = `${__dirname}/../media/sample.json`;
    console.log(path);
    const sample = { name: "sample" };
    writeFileSync(path, JSON.stringify(sample, null, 2), "utf8");
    console.log("Data successfully saved");
  } catch (err) {
    console.log(err);
  }

  console.log(data);
  return data?.data;
};

exports.checkEndpoint = checkEndpoint;
