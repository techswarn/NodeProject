const { Pool } = require("pg");

const catchAsync = require("../utils/catchAsync");
const EventEmitter = require("events").EventEmitter;
const sayHelloEvent = new EventEmitter();

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const weather = require("./../scripts/weather.js");
const nasa = require("../scripts/checkEndpoint");
const { readFunc } = require("../utils/readini");
const dbpgcheck = require("./../scripts/dbpgcheck");
const dbpgpool = require("./../scripts/dbpgpool");
const dbmysqlcheck = require("./../scripts/dbmysqlcheck");
const dbknexcheck = require("./../scripts/dbknexcheck");
const dbSequelizeCheck = require("./../scripts/dbmysqlSequelizeCheck.js");
const checkEndpoint = require("./../scripts/checkEndpoint");
const imageProcess = require("./../scripts/imageProcess");
const checkRedisCon = require("./../scripts/dbredisCheck");

class Sayhello {
  constructor(name) {
    this.name = name;
    sayHelloEvent.on("hello", this.hello);
  }
  hello() {
    console.log("Hello from server due to triggered event");
  }
}

let newhello = new Sayhello("swarn");

exports.getWeather = (req, res, next) => {
  sayHelloEvent.emit("hello");
  weather.getWeather();
  res.send("Send weather data");
};

exports.getAsteroidData = (req, res, next) => {
  nasa.getAsteroidData();
  res.send("Send weather data");
};

exports.getReadFile = (req, res, next) => {
  console.log("read file");
  const data = readFunc();
  res.status(200).json(data);
};

exports.uploadFile = (req, res, next) => {
  res.send("Send weather data");
};

exports.dbupdate = catchAsync(async (req, res, next) => {
  console.log("db pg client called");
  const { rows } = await dbpgcheck.dbConnection();

  res.status(200).json({
    message: "Success",
    data: rows,
  });
});

exports.dbpoolcon = catchAsync(async (req, res, next) => {
  console.log("db pg pool called 1");
  const { rows } = await dbpgpool.dbpoolcon();

  res.status(200).json({
    message: "Success",
    data: rows,
  });
});

exports.dbmysqlcheck = catchAsync(async (req, res, next) => {
  const data = await dbmysqlcheck.mysqlDbConnect();
  //  console.log("Returned data from listings: " + data);

  res.status(200).json({
    message: data,
  });
});

exports.dbknexcheck = catchAsync(async (req, res, next) => {
  console.log("knex run");
  const data = await dbknexcheck.dbknexcon();

  res.status(200).json({
    message: data,
  });
});

exports.dbSquelizecheck = catchAsync(async (req, res, next) => {
  console.log("squelize run");
  const data = await dbSequelizeCheck.dbmysqlSequelizeCheck();

  res.status(200).json({
    message: data,
  });
});

exports.checkendpoint = catchAsync(async (req, res, next) => {
  console.log("here 1");
  const data = await checkEndpoint.checkEndpoint(req);
  if (data) {
    res.status(200).json({
      message: "Healthy",
    });
  } else {
    res.status(500).json({
      message: "Unhealthy",
    });
  }
});

exports.imageprocess = catchAsync(async (req, res, next) => {
  // console.log(req);
  const data = await imageProcess.imgProcess();
  data === true
    ? res.status(200).json({ message: "Image resized successfull" })
    : res.status(500).json({ message: "something went wrong" });
});

exports.checkRedis = catchAsync(async (req, res, next) => {
  //console.log(req);
  const data = await checkRedisCon.checkRedis(req.body);

  res.status(200).json({ message: `Successfully added ${data}` });
});
