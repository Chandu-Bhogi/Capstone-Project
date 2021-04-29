const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Users);

exports.addEmployee = asyncHandler(async (req, res, next) => {
    req.body.user_type = 1;
    insertObjectInDB(req, res, next);
});

exports.deleteEmployee = asyncHandler(deleteObjectFromDB);

exports.updateEmployee = asyncHandler(updateObjectInDB);

exports.getAllEmployees = asyncHandler(getAllObjectsFromDB);

exports.getEmployeeByQuery = asyncHandler(getObjectsByQueryFromDB);

