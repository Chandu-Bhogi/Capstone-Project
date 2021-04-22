const express = require("express");
const Orders = require("../../controllers/Orders");


const router = express.Router();

router.get("/getallOrders", Orders.getAllOrders);
router.get("/getorder", Orders.getOrder);

router.post("/createorder", Orders.createOrder);

router.put("/update", Orders.updateOrder);

router.delete("/deletetorder", Orders.deleteOrder);

module.exports = router;
