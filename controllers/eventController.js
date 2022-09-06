const catchAsync = require("../utils/catchAsync");
const EventEmitter = require('events').EventEmitter; 
const sayHelloEvent = new EventEmitter;

const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const weather = require('./../scripts/weather.js')
const nasa = require('./../scripts/nasa')
const {readFunc} = require('../utils/readini')
const dbupdate = require('./../scripts/dbupdate')
const dbpgpool = require('./../scripts/dbpgpool')
const { Pool } = require('pg')
class Sayhello  {
  constructor(name) {
    this.name = name;
    sayHelloEvent.on('hello', this.hello)
  }
  hello(){
    console.log('Hello from server due to triggered event')
  }
}

let newhello = new Sayhello('swarn')



exports.getWeather = (req, res, next) => {
  sayHelloEvent.emit('hello')
  weather.getWeather()
  res.send("Send weather data")
}

exports.getAsteroidData = (req, res, next) => {
  nasa.getAsteroidData()
  res.send("Send weather data")
}

exports.getReadFile = (req, res, next) => {
  console.log("read file")
  const data = readFunc()
  res.status(200).json(data);
}

exports.uploadFile = (req, res, next) => {
  res.send("Send weather data")
}

exports.dbupdate = (req, res, next) => {
  console.log("db pg client called")
  dbupdate.dbCon()
  res.send("db call made")
}

exports.dbpoolcon = catchAsync(async (req, res, next) => {
  console.log("db pg pool called 1")
  const {rows} = await dbpgpool.dbpoolcon()

  res.status(200).json({
    message: "Success",
    data:rows
  })

  // console.log(process.env.PG_HOST_POOL)
  // console.log(process.env.PG_DATABASE_POOL)
  // console.log(process.env.PG_PORT_POOL)
  // console.log(process.env.PG_USER_POOL)
  // console.log(process.env.PG_PASSWORD_POOL)

  // const pool = new Pool({
  //     user: process.env.PG_USER_POOL,
  //     host: process.env.PG_HOST_POOL,
  //     database: process.env.PG_DATABASE_POOL,
  //     password: process.env.PG_PASSWORD_POOL,
  //     port: process.env.PG_PORT_POOL,
  //     ssl: {
  //         rejectUnauthorized: false
  //     }
  // })

  // const result = await pool.query('SELECT * FROM company')
  // console.log(result)

  // res.status(200).json({
  //   message: "Success",
  //   data: result.rows
  // })
})

