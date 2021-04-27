const express = require("express");
const admin = require("../../controllers/admin");
const authMiddleware = require("../../middlewares/auth");
const validator = require("../../middlewares/validator");

const router = express.Router();

router.post('/login',admin.login)
router.post('/addAdmin',admin.postAdmin)
router.post('/addEmployee',admin.addEmployee)

router.get('/getAdmins',admin.getAdmins)

module.exports = router;
