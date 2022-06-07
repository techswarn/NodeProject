const express =  require('express')
const router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.post('/signup', authController.signup)
router.get('/sayhello', authController.hello)

module.exports = router;