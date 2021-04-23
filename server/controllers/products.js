const asyncHandler = require("../middlewares/async");
const Products = require("../models/Products");
let { getAllObjects, getObjectsByQuery, updateObject, deleteObject, insertObject } = require("./utils")(Products);

exports.addProduct = asyncHandler(async (req, res, next) => insertObject(req, res, next))

exports.deleteProduct = asyncHandler(async (req, res, next) => deleteObject(req, res, next))

exports.updateProduct = asyncHandler(async (req, res, next) => updateObject(req, res, next))

exports.getAllProducts = asyncHandler(async (req, res, next) => getAllObjects(req, res, next))

exports.getProductsByQuery = asyncHandler(async (req, res, next) => getObjectsByQuery(req, res, next))
