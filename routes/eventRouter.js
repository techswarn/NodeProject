const express =  require('express')
const eventController = require('./../controllers/eventController')
const router = express.Router();

console.log("Event router here")
router.get('/weather', eventController.getWeather);
router.get('/getAsteroidData', eventController.getAsteroidData)
router.get('/getReadFile', eventController.getReadFile)
router.post('/uploadFile', eventController.uploadFile)
router.get('/dbupdate', eventController.dbupdate)
router.get('/dbpoolcon', eventController.dbpoolcon)
router.get('/dbmysqlcon', eventController.dbmysqlcheck)
router.get('/dbknexcheck', eventController.dbknexcheck)

module.exports  = router;