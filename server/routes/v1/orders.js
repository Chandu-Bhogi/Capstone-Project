const express = require("express");
const Orders = require("../../controllers/orders");


const router = express.Router();

router.get("/getall", Orders.getAllOrders);
// get all orders by given status using req.query
router.get("/getorder", Orders.getOrder);

router.post("/createorder", Orders.createOrder);

router.put("/updateorder/:_id", Orders.updateOrder);

router.delete("/deletetorder/:_id", Orders.deleteOrder);

module.exports = router;
