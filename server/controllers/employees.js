const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Users);

exports.addEmployee = asyncHandler(insertObjectInDB());

exports.deleteEmployee = asyncHandler(deleteObjectFromDB);

exports.updateEmployee = asyncHandler(updateObjectInDB());

exports.getAllEmployees = asyncHandler(getAllObjectsFromDB);

exports.getEmployeeByQuery = asyncHandler(getObjectsByQueryFromDB);
