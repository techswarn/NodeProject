// const crypto = require('crypto');
// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
// // const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// // const Email = require('./../utils/email');
const User = require('./../models/userModel')

const catchAsync = require("../utils/catchAsync");
const appError = require("./../utils/appError")

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

    //Create cookie token and send back to client
    const token = newUser.createToken()

    const option =  {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
   
    res.status(201).cookie('token', token, option).json({
        token: token,
        status: 'success',
        message: 'User created'
      });
})

exports.signin = catchAsync(async(req, res, next) => {
    console.log(req.headers)
    const {email, password} = req.body

    //Check if email and password exists
    if(!email || !password) {
        return next(new appError('Please add email during form submission', 400))
    }

    const user = await User.findOne({email}).select('+password');
    console.log(user)
    const result = await user.isValidatedPassword(password, user.password)
    console.log(result)
    if(!user || !(await user.isValidatedPassword(password, user.password))){
        return next(new appError('Incorrect email or password', 401));
    }
    //Create cookie token and send back to client
    const token = user.createToken()

    const option =  {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
   
    res.status(201).cookie('token', token, option).json({
        token: token,
        status: 'success',
        message: 'User created'
      });
})


exports.logout = catchAsync(async(req, res, next) => {
    res.clearCookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({status:'success', message:'Succesfully logged out'})
})

exports.checkSite = catchAsync(async(req, res, next) => {
    console.log(req.headers)
    res.send("hello world")
})