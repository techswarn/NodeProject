const express =  require('express')
const router = express.Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.get('/sayhello', authController.hello)

module.exports = router;