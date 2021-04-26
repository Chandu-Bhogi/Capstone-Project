const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");


// Edit Profile
exports.updateUser = asyncHandler(async (req, res, next) => {
    Users.findOneAndUpdate({id: req.params.id}, { $set: req.body }, { new: true })
    .then((user) => 
      res.status(200).json({ user, message: "Success" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: `userId ${String(req.params.id)} could not be inserted, Err ${err}`}));
});

