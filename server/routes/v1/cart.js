const express = require("express");
const Cart = require("../../controllers/cart");

const router = express.Router();

router.get("/getusercart", Cart.getUserCart);

router.post("/createCart/:_id", Cart.createUserCart);

router.put("/editusercart/:_id", Cart.editUserCart);

router.delete("/deleteusercart/:_id", Cart.deleteUserCart);

module.exports = router;
