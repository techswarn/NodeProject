const catchAsync = require("../utils/catchAsync");
const EventEmitter = require('events').EventEmitter; 
const sayHelloEvent = new EventEmitter;

const weather = require('./../scripts/weather.js')
const nasa = require('./../scripts/nasa')
const {readFunc} = require('../utils/readini')
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

