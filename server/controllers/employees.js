const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Employee = require("../models/employees");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Employee);

exports.addEmployee = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, email} = req.body
    let password = makePassword(email)
    let count = 1
    let id = ""
    
    while(true) {
        id = makeEmployeeID(firstName, lastName, count)
        let [check] = await Employee.find({id: id})

        if(check) {
            count++
        } else {
            break
        }
    }
    req.body.id = id
    let DBstate = {id, firstName, lastName, email, password}
    insertObjectInDB(DBstate)(req, res, next);
});

exports.deleteEmployee = asyncHandler(deleteObjectFromDB);

exports.updateEmployee = asyncHandler(updateObjectInDB());

exports.getAllEmployees = asyncHandler(getAllObjectsFromDB);

exports.getEmployeeByQuery = asyncHandler(getObjectsByQueryFromDB);

function makePassword(email) {
    let min = Math.ceil(100)
    let max = Math.floor(1000)
    let num = Math.floor(Math.random() * (max - min) + min)

    return email.split("@")[0] + "" + num
  }

function makeEmployeeID(fName, lName, count) {
    return fName.charAt(0).toLowerCase() + lName.toLowerCase() + count
  }
