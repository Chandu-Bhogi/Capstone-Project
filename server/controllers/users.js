const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/Users")
const path = require('path')

// Edit Profile
exports.updateUser = asyncHandler(async (req, res, next) => {
    console.log("hi in the update")
    console.log(req.body)

    User.findOneAndUpdate({"userName":req.body.userName},{$set:req.body},{multi: true })
    .then(user=>res.status(200).json({status:true,user}))
    .catch(err=>res.status(422).json({status:false,message:`There was an error! -> ${err}`}))
});