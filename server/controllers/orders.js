const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Orders = require("../models/Orders");
const Users = require("../models/Users");
const Products = require("../models/Products");

let {
  getAllObjectsFromDB,
  getObjectsByQueryFromDB,
  updateObjectInDB,
  deleteObjectFromDB,
  insertObjectInDB,
  generateOrderFromCart,
  calculateTotalBill,
} = require("./utils")(Orders);

exports.createOrder = asyncHandler(async (req, res, next) => {
  let { _id, user_id, status, total_bill, list, timestamp } = req.body;

  let [user] = await Users.find({ _id: user_id });
  console.log(user);
  if (!user)
    return res
      .status(400)
      .json({ status: false, message: "No Such User registered in DB" });

  req.body = { _id, user_id, status, list: list, total_bill, timestamp };
  insertObjectInDB(req, res, next);
});

exports.getAllOrders = asyncHandler(getAllObjectsFromDB);

exports.getOrder = asyncHandler(getObjectsByQueryFromDB);

exports.updateOrder = asyncHandler(async (req, res, next) => {
  updateObjectInDB(req, res, next);
});

exports.deleteOrder = asyncHandler(deleteObjectFromDB);
