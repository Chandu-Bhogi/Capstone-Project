const express = require("express");
const products = require("../../controllers/products");
const authMiddleware = require("../../middlewares/auth");
const validator = require("../../middlewares/validator");

const router = express.Router();

router.get("/getall", products.getAllProducts);
router.get("/getone", products.getProductsByQuery);

router.post("/add", products.addProduct);

router.put("/update/:_id", products.updateProduct);

router.delete("/delete/:_id", products.deleteProduct);

module.exports = router;
