const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");

exports.getUserByUsername = asyncHandler(async(req,res,next)=>{
  console.log("GET USER BY USERNAME")
  let username = req.params.userName
  let result = await Users.find({userName:username})
  .then(user=>res.status(200).json({status:true,user,message:"Found User"}))
  .catch(err=>res.status(422).json({status:false,message:`There was an error! => ${err}`}))
})

// Edit Profile
exports.updateUser = asyncHandler(async (req, res, next) => {
    Users.findOneAndUpdate({id: req.params.id}, { $set: req.body }, { new: true })
    .then((user) => 
      res.status(200).json({ user, message: "Success" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: `userId ${String(req.params.id)} could not be inserted, Err ${err}`}));
});

