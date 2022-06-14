const catchAsync = require("../utils/catchAsync");
const EventEmitter = require('events').EventEmitter; 
const sayHelloEvent = new EventEmitter;

const weather = require('./../scripts/weather.js')

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



exports.eventHello = (req, res, next) => {
  sayHelloEvent.emit('hello')
  weather.getWeather()
  res.send("true")
}
