const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Employee = require("../models/employees");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Employee);

exports.addEmployee = asyncHandler(insertObjectInDB());

exports.deleteEmployee = asyncHandler(deleteObjectFromDB);

exports.updateEmployee = asyncHandler(updateObjectInDB());

exports.getAllEmployees = asyncHandler(getAllObjectsFromDB);

exports.getEmployeeByQuery = asyncHandler(getObjectsByQueryFromDB);
