const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/Users")
const path = require('path')

// DEBUG methods
exports.show_addUser = asyncHandler(async (req,res,next)=>{
    res.sendFile(path.resolve(__dirname+"/../public/addUser.html"))   
})
exports.addUser = asyncHandler(async (req,res,next)=>{
    console.log("==> In the addUser POST")
    console.log(req.body)

    let profile = new User({
        _id:req.body.userId,
        name:req.body.name,
        email:req.body.email,
        password: req.body.password,
        cart: [],
        funds: req.body.funds
    })
    profile.save((error,result)=>{
        if(!error){
            res.send("[LOG]: Inserted!")
        }else{
            res.send("[ERROR]: Insertion failure. ==> " + error)
            //console.log(error)
        }
    })
})
exports.retrieveAllUsers = asyncHandler(async (req,res,next)=>{
    console.log("in retrieve")
    User.find({},(error,result)=>{
        if(!error){
            res.send(result)
        }else{
            res.send("Nothing")
        }
    })

})

// Edit Profile
exports.updateUser = asyncHandler(async (req, res, next) => {
    
});