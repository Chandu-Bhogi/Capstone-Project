const express = require("express");
const users = require("../../controllers/users");

const router = express.Router();

// Debug/Development Area
router.get("/adduser",users.show_addUser);
router.post("/adduser",users.addUser);

router.get("/updateuser",users.show_updateUser);
router.post("/updateuser", users.updateUser);

router.get("/allusers", users.retrieveAllUsers);

router.get("/findUser",users.findUser);

module.exports = router;