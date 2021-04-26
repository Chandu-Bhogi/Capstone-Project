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
    console.log("hi in the update")
    console.log(req.body)

    console.log("userName: " + req.body['userName'])
    console.log("city: " + req.body['f_city'])
    console.log("state: " + req.body['f_state'])
    //{$set:{"city":req.body['f_city'],"state":req.body['f_state']}}

    // User.findOne({"userName":req.body.userName},(err,data)=>{
    //     if(!err){
    //         console.log(data)
    //         // let id = data["_id"]
    //         // User.updateOne({_id:id},{$set:{"city":req.body.f_city,"state":req.body.f_state}},(error,result)=>{
    //         //     if(!error){
    //         //         console.log(result)
    //         //     }
    //         //     else{
    //         //         console.log(error)
    //         //     }
    //         // })
    //     }
    // })


    User.findOneAndUpdate({"userName":req.body.userName},{$set:{"city":req.body.f_city,"state":req.body.f_state}},{multi: true },(error,result)=>{
        if(!error){
            console.log("....")
            console.log(result)
            console.log("====")
            if(result.nModified > 0){
                console.log("-- Updated --")
            }
            else{
                console.log("[LOG]: ERROR -- Didn't find the record.")
            }
        }else{
            console.log("[LOG]: ERROR -- " + error)
        }
    })
});
exports.show_updateUser = asyncHandler(async (req,res,next)=>{
    res.send("update area")
})


exports.findUser = asyncHandler(async (req,res,next)=>{
    res.sendFile(path.resolve(__dirname+"/../public/findUser.html"))   
})