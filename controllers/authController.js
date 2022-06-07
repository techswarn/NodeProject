// const crypto = require('crypto');
// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
// // const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// // const Email = require('./../utils/email');
const User = require('./../models/userModel')
const catchAsync = require("../utils/catchAsync");


exports.signup = catchAsync(async(req, res, next) => {
    console.log(req.body)
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    console.log(newUser)

   
    res.status(201).json({
        status: 'success',
        message: 'User created'
      });
})