const express = require("express");
const ProductRequest = require("../../controllers/product_request");


const router = express.Router();

router.post("/addRequest", ProductRequest.addRequest);
router.post("/deleteRequest",ProductRequest.deleteRequest);

module.exports = router;
