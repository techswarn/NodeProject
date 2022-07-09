const express =  require('express')
const eventController = require('./../controllers/eventController')
const router = express.Router();

console.log("Event router here")
router.get('/weather', eventController.getWeather);
router.get('/getAsteroidData', eventController.getAsteroidData)
router.get('/getReadFile', eventController.getReadFile)
router.post('/uploadFile', eventController.uploadFile)
module.exports  = router;