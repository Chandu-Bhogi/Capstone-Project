const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Users = require("../models/Users");
const Products = require("../models/Products");

//get the user's cart
exports.getUserCart = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    console.log(id)
    Users.find({id: id})
    .then(([user]) => {
        console.log(user)
        res.status(200).json({ cart: user ? user.cart : [], user_id: id, message: "Success" })
    })
    .catch(err => 
        res.status(400).json({ status: false, message: `Error fectching Cart Records. Err ${err}`})
    )
});

//input product_id array in req.body by the key product_ids
exports.createUserCart = asyncHandler(async (req, res, next) => {
    let { product_ids } = req.body;
    let id = req.params.id;

    let products = await Products.find({ id: { $in : product_ids } })

    console.log(products)
    if (products.length > 0){
        Users.findByIdAndUpdate(req.params.id, { cart: products }, { new: true })
        .then((user) => 
          res.status(200).json({ user, message: "Success" })
        )
        .catch((err) =>
          res.status(400).json({ status: false, message: `userId ${String(req.params.id)}'s cart data could not be inserted, Err ${err}`})
        );
    } else {
        res.status(400).json({ status: false, message: `Error in product Ids, Such products does not exist in database`})
    }
});

//input product_id array in req.body by the key product_ids
exports.editUserCart = asyncHandler(async (req, res, next) => {
    let { product_ids } = req.body;
    
    let products = await Products.find({ id: { $in : product_ids } })

    console.log(products)
    if (products){
        Users.findOneAndUpdate({id: req.params.id}, { cart: products }, { new: true })
        .then((user) => 
          res.status(200).json({ user, message: "Success" })
        )
        .catch((err) =>
          res.status(400).json({ status: false, message: `userId ${String(req.params.id)}'s cart data could not be inserted, Err ${err}`})
        );
    } else {
        res.send(400).json({ status: false, message: `Error in product Ids, Such product does not exist in database`})
    }
});

//empty the whole cart
exports.deleteUserCart = asyncHandler(async (req, res, next) => {
    Users.findOneAndUpdate({id: req.params.id}, { cart: [] }, { new: true })
    .then((user) => 
      res.status(200).json({ user, message: "Success" })
    )
    .catch((err) =>
      res.status(400).json({ status: false, message: `userId ${String(req.params.id)}'s cart data could not be deleted, Err ${err}`})
    );
});