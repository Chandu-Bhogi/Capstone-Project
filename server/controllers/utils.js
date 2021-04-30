const getAllObjectsFromDB = (model) => async (req, res, next)  => {
    model.find({})
    .then((data) =>
    res.status(200).json({data, message: `Success` })
    )
    .catch(err => 
    res.status(400).json({ status: false, message: `Request failed ! Error : ${err}` })
    );
}

const getObjectsByQueryFromDB = (model) => async (req, res, next)  => {
    let queryObj = {};
    
    //query builder
    Object.entries(req.query).forEach(([key,val]) => queryObj[key] = {$regex: `^${val}`})

    model.find(queryObj)
    .then(data => res.status(200).json({ message: `Success`, data}))
    .catch(err => res.status(400).json({ status: false, message: `Bad request!!  Could not fetch. Err: ${err}`}))
}

const deleteObjectFromDB = (model) => async (req, res, next)  => {

  if (!req.params._id) return res.status(500).json({ status: false, message: "Wrong Request!! Please enter ID of the resource to be deleted"});

  let [check] = await model.find({_id: req.params._id});
  if (!check) {
      res.status(422).json({ status: false, message: `Resource doesnt exist!!`});
  } else {
      model.deleteOne({ _id: req.params._id })
      .then(response =>
      res.status(200).json({ data: response, message: `Success!! Resource with id ${req.params._id} deleted.` })
      )
      .catch(err => 
      res.status(400).json({ status: false, message: `Could not delete the Resource. Request failed ! Error : ${err}` })
      );
  }
}

const insertObjectInDB = (model) => async (req, res, next) => {
  console.log("BODY----------",req.body)

  const { _id } = req.body;
 
  let [resouce] = await model.insertMany([req.body]);

  console.log("RESOURCE------",resouce)
  console.log("------------------------------------------------------------")
  if (resouce && resouce._id) {
    res.status(200).json({ status: true, data: resouce , message: `Resource is added in database with _id: ${resouce._id}.` });
  } else {
    res.status(422).json({ status: false, message: "There was a problem while inserting in DB, please try again." });
  }
}

const updateObjectInDB = (model) => async (req, res, next) => {

    const _id = req.params._id;

    model.findOneAndUpdate({_id: _id}, { $set: req.body }, { new: true })
    .then((data) =>
      res.status(200).json({ data, message: `Success!! ${_id} updated in DB` })
    )
    .catch(err =>
      res.status(400).json({ status: false, message: `_ID ${_id} could not be inserted, Err ${err}` })
    );
}

const generateCartObject = (products, product_obj) => {
  return products.map(obj => {
      obj.quantity = product_obj[obj._id];
      return (obj);
    })
}

const generateOrderFromCart = (cart) => {
  return cart.map(obj => {
      obj.cost = obj.price * obj.quantity;
      return (obj);
    })
}


const calculateTotalBill = (order) => {
  let total = (order.length != 0) ? order.reduce((acc, obj) => acc + obj.cost, 0) : 0
  return total
}

module.exports = (model) => {
    return(
        {
            getAllObjectsFromDB: getAllObjectsFromDB(model), 
            getObjectsByQueryFromDB: getObjectsByQueryFromDB(model),
            updateObjectInDB: updateObjectInDB(model),
            deleteObjectFromDB: deleteObjectFromDB(model),
            insertObjectInDB: insertObjectInDB(model),
            generateCartObject,
            generateOrderFromCart,
            calculateTotalBill
        }
    )
}