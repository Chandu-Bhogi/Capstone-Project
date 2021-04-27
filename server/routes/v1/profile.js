const express = require("express");
const users = require("../../controllers/users");

const router = express.Router();

router.get("/getUser/:userName",users.getUserByUsername)
router.put("/updateuser/:id", users.updateUser);

router.post('/addFunds',users.addFunds)

module.exports = router;