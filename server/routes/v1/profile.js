const express = require("express");
const users = require("../../controllers/users");

const router = express.Router();

router.put("/updateuser", users.updateUser);
router.get("/getUser/:_id", users.getUser);
router.put("/updateuser/:_id", users.updateUserById);

router.put("/addFunds", users.addFunds);

module.exports = router;
