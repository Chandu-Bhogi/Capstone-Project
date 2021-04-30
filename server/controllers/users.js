const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/Users")
const path = require('path')

// Edit Profile
exports.updateUser = asyncHandler(async (req, res, next) => {

    User.findOneAndUpdate({_id :req.params._id},{$set:req.body},{multi: true })
    .then(user=>res.status(200).json({status:true,user}))
    .catch(err=>res.status(422).json({status:false,message:`There was an error! -> ${err}`}))
});

exports.getUser = asyncHandler(async(req,res,next)=>{
  
  let {_id} = req.params

  console.log(_id)
  let [user] = await User.find({_id: _id})

   if (user && user._id) {
      res.status(200).json({ status: true, data: user , message: `user is found ${user._id}.` });
    } else {
      res.status(422).json({ status: false, message: "There was a problem while fetching from DB, please try again." });
    }
})

// Edit Profile
exports.updateUserById = asyncHandler(async (req, res, next) => {
    User.findOneAndUpdate({id: req.params.id}, { $set: req.body }, { new: true })
    .then((user) => 
      res.status(200).json({ user, message: "Success" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: `userId ${String(req.params.id)} could not be inserted, Err ${err}`}));
});

exports.addFunds = asyncHandler(async (req,res,next)=>{
  let { _id , funds } = req.body;
  User.findOneAndUpdate({_id:_id},{$inc:{funds:funds}},{new:true})
  .then(user=>res.status(200).json({status:true,message:"success",user}))
  .catch(err=>res.status(422).json({status:false,message:`There was an error ==> ${err}`}))
})