const express = require("express");
const employees = require("../../controllers/employees");

const router = express.Router();

//localhost:4100/v1/employees/getallemployees
// router.post("/login",employees.login)
router.get("/getall", employees.getAllEmployees);
router.get("/getone", employees.getEmployeeByQuery);

router.post("/add", employees.addEmployee);

router.put("/update/:_id", employees.updateEmployee);

router.delete("/delete/:_id", employees.deleteEmployee);



module.exports = router;
