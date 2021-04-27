const express = require("express");
const employees = require("../../controllers/employees");

const router = express.Router();

//localhost:4100/v1/employees/getallemployees
router.get("/getallemployees", employees.getAllEmployees);
router.get("/getemployee", employees.getEmployeeByQuery);

router.post("/addemployee", employees.addEmployee);

router.put("/updateemployee/:id", employees.updateEmployee);

router.delete("/deleteemployee/:id", employees.deleteEmployee);



module.exports = router;
