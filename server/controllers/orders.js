const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Orders = require("../models/Orders");
const Users = require("../models/Users");
const Products = require("../models/Products");

let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB, generateOrderFromCart, calculateTotalBill } = require("./utils")(Orders);



exports.createOrder = asyncHandler(async (req, res, next) => {
    let { _id, user_id, status, order , total_bill, list} = req.body;

    let [user] = await Users.find({ _id: user_id });
    console.log(user)
    if (!user) return res.status(400).json({ status: false, message: "No Such User registered in DB" });

    // let total_bill = user.cart_total

    // order = generateOrderFromCart(cart)
    // total_bill = calculateTotalBill(order)

    req.body = { _id, user_id, status, list: list, total_bill};
    insertObjectInDB(req, res, next);
});

exports.getAllOrders = asyncHandler(getAllObjectsFromDB);

exports.getOrder = asyncHandler(getObjectsByQueryFromDB);


exports.updateOrder = asyncHandler(async (req, res, next) =>{
    const _id = req.params._id;
    let { user_id, status } = req.body;

    let [user] = await Users.find({ _id: user_id });
    if (!user) return res.status(400).json({ status: false, message: "No Such User registered in DB" });
    
    let cart = user.cart
    let order = []
    let total_bill = 0

    order = generateOrderFromCart(cart)
    total_bill = calculateTotalBill(order)

    req.body = { _id, user_id, status, list: order, total_bill};
    updateObjectInDB(req, res, next);
});

exports.deleteOrder = asyncHandler(deleteObjectFromDB);