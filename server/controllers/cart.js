const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");
const Products = require("../models/Products");
let {
  getAllObjectsFromDB,
  getObjectsByQueryFromDB,
  updateObjectInDB,
  deleteObjectFromDB,
  insertObjectInDB,
  generateCartObject,
  calculateTotalBill,
} = require("./utils")(Users);

//get the user's cart
exports.getUserCart = asyncHandler(getObjectsByQueryFromDB);

//input product_id array in req.body by the key product_obj
exports.createUserCart = asyncHandler(async (req, res, next) => {
  let cart = req.body.cart;
  let cart_total = req.body.cart_total;
  // let cart_total = calculateTotalBill(cart);
  req.body = { cart: cart, cart_total: cart_total };
  updateObjectInDB(req, res, next);
});

//input product_id array in req.body by the key product_obj
exports.editUserCart = asyncHandler(async (req, res, next) => {
  let cart = req.body.cart;
  let cart_total = req.body.total;

  // let cart_total = calculateTotalBill(cart);
  req.body = { cart: cart, cart_total: cart_total };
  updateObjectInDB(req, res, next);
});

//empty the whole cart
exports.deleteUserCart = asyncHandler(async (req, res, next) => {
  req.body = { cart: [] };
  updateObjectInDB(req, res, next);
});
