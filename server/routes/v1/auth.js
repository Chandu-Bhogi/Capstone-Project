const express = require("express");
const auth = require("../../controllers/auth");
const authMiddleware = require("../../middlewares/auth");
const validator = require("../../middlewares/validator");

const router = express.Router();

router.post("/login", auth.login);
router.post("/signup", auth.signup);

module.exports = router;
