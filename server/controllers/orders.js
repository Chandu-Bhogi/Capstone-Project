const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Orders = require("../models/Orders");
const Users = require("../models/Orders");
const Products = require("../models/Products");

let { getAllObjectsFromDB, getObjectsByQueryFromDB, updateObjectInDB, deleteObjectFromDB, insertObjectInDB } = require("./utils")(Orders);



exports.createOrder = asyncHandler(async (req, res, next) => {
    let { id, recipient_id, status, product_ids } = req.body;

    let [recepient] = await Users.find({ id: recipient_id });
    if (!recepient) return res.status(400).json({ status: false, message: "No Such User registered in DB" });

    let list = await Products.find({ id : {$in : product_ids}})
    if (list.length !== product_ids.length) return res.status(400).json({ status: false, message: "Some of the product_ids are not available in DB" });

    DBstate = { id, recepient, list};
    insertObjectInDB(req, res, next)(DBstate);
});

exports.getAllOrders = asyncHandler(getAllObjectsFromDB);

exports.getOrder = asyncHandler(getObjectsByQueryFromDB);


exports.updateOrder = asyncHandler(async (req, res, next) =>{
    const id = req.params.id;
    let { recipient_id, status, product_ids } = req.body;

    let [recepient] = await Users.find({ id: recipient_id });
    if (!recepient) return res.status(400).json({ status: false, message: "No Such User registered in DB" });

    let list = await Products.find({ id : {$in : product_ids}})
    if (list.length !== product_ids.length) return res.status(400).json({ status: false, message: "Some of the product_ids are not available in DB" });

    DBstate = { id, recepient, list};
    updateObjectInDB(req, res, next)(DBstate);
});

exports.deleteOrder = asyncHandler(deleteObjectFromDB);