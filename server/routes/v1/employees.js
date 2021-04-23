const express = require("express");
const employees = require("../../controllers/employees");

const router = express.Router();

router.get("/getallemplyees", employees.getAllEmployees);

router.post("/addemployee", employees.addEmployee);

router.put("/updateemployee/:id", employees.updateEmployee);

router.delete("/deleteemployee/:id", employees.deleteEmployee);



module.exports = router;
