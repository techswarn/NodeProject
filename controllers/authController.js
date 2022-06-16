// const crypto = require('crypto');
// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
// // const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// // const Email = require('./../utils/email');
const User = require('./../models/userModel')
console.log(User)
const catchAsync = require("../utils/catchAsync");
const appError = require("./../utils/appError")


exports.signin = catchAsync(async(req, res, next) => {
    console.log("sign in")
})

exports.signup = catchAsync(async(req, res, next) => {
    const {firstName, lastName, userName, email, password, passwordConfirm} = req.body;

    if(!email || !firstName || !lastName || !userName ) {
        return next(new appError('Please add email during form submission', 400))
    }
    console.log(req.body)
    const newUser = await User.create({
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    });
    console.log(newUser)
    //Create cookie token and send back to client

    const token = User.createToken()

    const option =  {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
   
    res.status(201).cookie('token', token, options).json({
        token: token,
        status: 'success',
        message: 'User created'
      });
})

exports.hello = catchAsync(async(req, res, next) => {
    res.status(201).send('<p>some html</p>')
})