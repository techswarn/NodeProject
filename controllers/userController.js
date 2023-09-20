const User = require("./../models/userModel");

const catchAsync = require("../utils/catchAsync");
const appError = require("./../utils/appError");

exports.signin = catchAsync(async (req, res, next) => {
    console.log(req.headers);
    const { email, password } = req.body;
  
    //Check if email and password exists
    if (!email || !password) {
      return next(new appError("Please add email during form submission", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    const result = await user.isValidatedPassword(password, user.password);
    console.log(result);
    if (!user || !(await user.isValidatedPassword(password, user.password))) {
      return next(new appError("Incorrect email or password", 401));
    }
    //Create cookie token and send back to client
    const token = user.createToken();
  
    const option = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
  
    res.status(201).cookie("token", token, option).json({
      token: token,
      status: "success",
      message: "User created",
    });
  });