const express = require("express");
const users = require("../../controllers/users");

const router = express.Router();

// Debug/Development Area
router.get("/adduser",users.show_addUser);
router.post("/adduser",users.addUser);

router.put("/updatuser", users.updateUser);
router.get("/allusers", users.retrieveAllUsers);

module.exports = router;