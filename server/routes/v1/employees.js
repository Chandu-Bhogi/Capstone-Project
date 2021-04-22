const express = require("express");
const employees = require("../../controllers/employees");

const router = express.Router();

router.get("/getallemplyees", employees.getAllEmployees);

router.post("/addemployee", employees.addEmployee);

router.put("/updateemployee", employees.updateEmployee);

router.delete("/deleteemployee", employees.deleteEmployee);



module.exports = router;
