const asyncHandler = require("../middlewares/async");
const Products = require("../models/Products");
let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Products);

exports.addProduct = asyncHandler(insertObjectInDB)

exports.deleteProduct = asyncHandler(deleteObjectFromDB)

exports.updateProduct = asyncHandler(updateObjectInDB)

exports.getAllProducts = asyncHandler(getAllObjectsFromDB)

exports.getProductsByQuery = asyncHandler(getObjectsByQueryFromDB)
