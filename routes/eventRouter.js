const express =  require('express')
const eventController = require('./../controllers/eventController')
const router = express.Router();

console.log("Event router here")
router.get('/eventHello', eventController.eventHello);
router.get('/getAsteroidData', eventController.getAsteroidData)

module.exports  = router;