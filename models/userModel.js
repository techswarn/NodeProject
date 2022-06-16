const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: [true, 'Please tell us your name!']
    },
    lastName:{
      type: String,
      required: [true, 'Please tell us your name!']
    },
    userName:{
      type: String,
      required: [true, 'Please tell us your name!']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
      id:{
        type: String,
        // required: false
      },
      secure_url:{
        type: String,
        // required: false
      }
    },
    role: {
      type: String,
      enum: ['user', 'guide', 'lead-guide', 'admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    forgotPasswordExpire: Date,
    createdAt: {
      type:Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true,
      select: false
    }
});
const saltRounds = 10;

//Encrypt password before save
userSchema.pre("save", async function(next) {
  // Only run this function if password was actually modified
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, saltRounds);
    console.log(this.password)
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

//Verief password, validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function(userPassword){
  return await bcrypt.compare(userPassword, this.password)
}

//Create and return JWT token
userSchema.methods.createToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY
  })
}

//Create forgot password token
userSchema.methods.forgotPasswordToken = function () {
  //generate random bytes using crypto
  const forgotToken = crypto.randomBytes(256).toString('hex')
  //getting a hash-make sure to get a hash
  this.passwordResetToken = crypto.createHash('sha256').update(forgotToken).digest('hex')
  //time of token
  this.forgotPasswordExpire = Date.now() + 20 * 60 * 1000

  return forgotToken
}




const User = mongoose.model('User', userSchema)

module.exports = User