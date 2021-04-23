const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");

exports.addEmployee = asyncHandler(async (req, res, next) => {
    const { id } = req.body;

    if (!id) return res.status(500).json({ status: false, message: "Wrong Request"});
  
    let [check] = await Users.find({id});
    if (check && check.id == id) {
      res.status(422).json({ status: false, message: `Duplicate Employee ID!! ID:${id} already exists`});
    }
    else{
      let [user] = await Users.insertMany(req.body);
  
      if (user && user.id) {
        res.status(200).json({ status: true, message: `${user.name} is added in database with ID: ${user.id}.` });
      } else {
        res.status(422).json({ status: false, message: "There was a problem while inserting user in DB, please try again." });
      }
    }
});

exports.deleteEmployee = asyncHandler(async (req, res, next) => {
    if (!req.params.id) return res.status(500).json({ status: false, message: "Wrong Request"});
  
    let [check] = await Users.find({id: req.params.id});
    if (!check) {
        res.status(422).json({ status: false, message: `User doesnt exist!!`});
    } else {
        Users.deleteOne({ id: req.params.id })
        .then(response =>
        res.status(200).json({ data: response, message: `Success!! User with id ${req.params.id} deleted.` })
        )
        .catch(err => 
        res.status(400).json({ status: false, message: `Could not delete the user. Request failed ! Error : ${err}` })
        );
    }
});

exports.updateEmployee = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let [check] = await Users.find({id});

    if (!check) return res.status(404).json({ status: false, message: `User with ID: ${id} is not available in DB`})

    Users.findOneAndUpdate({id: id}, req.body, { new: true })
    .then((user) =>
      res.status(200).json({ user, message: `Success!! User with ${id} updated in DB` })
    )
    .catch(err =>
      res.status(400).json({ status: false, message: `User ID ${id} could not be inserted, Err ${err}` })
    );

});

exports.getAllEmployees = asyncHandler(async (req, res, next) => {
  
    Users.find({ })
    .then(users =>
    res.status(200).json({users, message: `Success!! All users fetched.` })
    )
    .catch(err => 
    res.status(400).json({ status: false, message: `Request failed ! Error : ${err}` })
    );
});
