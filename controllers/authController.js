// const crypto = require('crypto');
// const { promisify } = require('util');
// const jwt = require('jsonwebtoken');
// // const User = require('./../models/userModel');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// // const Email = require('./../utils/email');
const User = require("./../models/userModel");

const catchAsync = require("../utils/catchAsync");
const appError = require("./../utils/appError");
const Email = require("./../scripts/sendmail");

exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, userName, email, password, passwordConfirm } =
    req.body;
  console.log(`EMail: ${email}`);

  if (!email || !firstName || !lastName || !userName) {
    return next(new appError("Please add email during form submission", 400));
  }
  console.log(`reqbody: ${req.body}`);
  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });

  //Create cookie token and send back to client
  const token = newUser.createToken();

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

exports.signin = catchAsync(async (req, res, next) => {
  console.log(req.headers);
  const { email, password } = req.body;

  //Check if email and password exists
  if (!email || !password) {
    return next(new appError("Please add email during form submission", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  console.log(user);
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

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ status: "success", message: "Succesfully logged out" });
});

exports.checkSite = catchAsync(async (req, res, next) => {
  console.log(req.headers);
  console.log(
    "sfdqeramhaahklsleiprrmpgnnkiqomqgdaecqmnqcadkkgikekoliqbjaqdjcchqghcraanqiosnredgflrodbhbmbelneqiamooibaabhqfdsfsalorppebgjsjaaskqdiealppkdgmdoeqahbdpmeksmqemdgabrfekogqkeqoinkorhcomrsoqflpaianhkggiidjlgohmdmaqiqmdhkpoejenffakaogjcpsknpekcigjkjcgeslpnslmobbhcnddnpsicglkcjpmldbfqcmfeeaaqncshijjrfsimfhpgnrpkqcqpcajbiaoshgqercbdbqsjkfsgbpidomhbrriclfpcrbesofpsjccoaojrdcrmnaafdriqodfpdrlpjfmdepfkiecdgqaehcdnbgdeblragpdqqsnicnebofhffgbeilpgmafhdsicmsqdieeqdjbmllnppiiqnlbsnrdddrfkkejfjfosfpmgqqsldkljngnhjqgfegpeeqjsodfkmqcsokiblqsnersfbbiccbhgeaknammmepmdpkamqjipgschlfeqjgqqcgkaehpiesjfpqnselndebhrqdpgjlofeajapasodffqinofsbokkmqnqjlijklepilgbpbdprrnlphobcgfljnnsfnmqeesddiedibodqberhosljcpjorajarpbqqpgnkmrlpcdidrjmopspaqrmjrrfhsqssodjcmdalkjdsgsqhmcalshpkcamgafhlmgfdhkfjcqilgldnafalijbdnselkbmpdmkifcgrirndklsahjfcqrhspdfihsngcdeqopcarnokmbohohrfdfjgqipmhfgfpkkeqjnpmhjaacphlnrprhrbnnrsdiqicmgdsnosgikaqopbhgmoqnshmjmjrranleopgsfsdkfsrnoqskdjglimcqfsooohhlnsiiklereafrqcgfejdolsdgglifhkdnhmchgllhfojkigjaeposjcqbcboanhspgqolbcjfilnpkksesppfsjkimglmndqojgmkhaeskclhkqdolnhokapnqhiqrhhlakmpobicirolecddcqfaqohjcjlqdohgjcfaqipfgoiaorgpeincghjrqdqhnmirmnjblcespannhacrgqcrigbsrmmclcjfpagkmdrbpqebrklfsrdakdhmhgadkfcnmfaofbbmbrsioneialhailfnlbehaoggjqodckbdbndgcjreahricbfdfnbhccchjqfpgjhhildmlrbinpajiapmakslalklicedsjgnrrsocqnlppkafdreqskeenlqhklhopdnmdnhakaesmamegglcdpjfarolrcdhdkhfplcglglgipoqdrefojdiomahanmcaahhclafcdgghorpjlpmrclpdabqnpncojgabpmlecqehqpphedqhrsbkhdnhnngbjipgpcgidrdfdmhbkisnqolfjofclqdomfbaljhsqedmskbhblhbklkgijqlhegsoqhhmoinckcehlehbenqdljjmgmaapkkhliispkppbkkndfekdmpphpfpdkajfhdqapjgrrnogmdbgsmkekaesmqbcqrsffeglrbirleljombefaaioiordndhipedaheshsnljaqjemrkcjibbchfbgoiicedhaqkkhonpmmlrieeaahlchkelgonlmlbkqpcmijirdjjhqkhsiskenacpiflpigaffhhggjiibgcbfmmsjqbbcifsrbnlgaebjqddnljraiqrfhgchekolifkqmhhbcckmfpkbolrqdsrbfhqhplpgdsdscnfboplhemjlilcegckfgedlijrfpgqeoejjqpbhghifpjklcnjfqqbihigijsacjfsohcmhsahhijlkmiblgrcimgammmohgsnghilfadknbbgefhijkjjegpogliaikipmdqqbhgnamkglonjfomildiedbpffglbflbriapmqsjjhnqnleoisecbiorgednniaprsajiqrohokjddfgpeenhlipeiddqsfhokdhgonfnnffshmr"
  );
  const timestamp = Math.floor(Date.now() / 1000) * 1000;

  const normalFormat = new Date(timestamp);

  const timestamp1 = new Date().getDay();

  console.log(timestamp);
  console.log(timestamp1);

  res.send(
    `Sent hello world at ${normalFormat}, ${timestamp} , ${timestamp1} `
  );
});

// Password forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // Check of user exists
  const { email } = req.body;
  console.log(email);

  const user = await User.findOne({ email }).exec();
  console.log(user);

  if (!user) {
    return next(new appError("User does not exists", 404));
  }

  //Generate token and send through email
  const forgotPasswordToken = await user.forgotPasswordToken();
  console.log(forgotPasswordToken);

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/forgotPassword/${forgotPasswordToken}`;
  console.log(resetUrl);
  await new Email(user, resetUrl).send("resetPassword", "Reset password email");

  res.send("Forgot password");
});
