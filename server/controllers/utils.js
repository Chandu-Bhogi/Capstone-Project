const getAllObjects = (model) => async (req, res, next)  => {
    model.find({})
    .then((data) =>
    res.status(200).json({data, message: `Success` })
    )
    .catch(err => 
    res.status(400).json({ status: false, message: `Request failed ! Error : ${err}` })
    );
}

const insertObject = (model) => async (req, res, next)  => {
    const { id } = req.body;

    if (!id) return res.status(500).json({ status: false, message: "Wrong Request"});
  
    let [check] = await model.find({id});
    if (check && check.id == id) {
      res.status(422).json({ status: false, message: `Duplicate ID!! ID:${id} already exists`});
    }
    else{
      let [check] = await model.insertMany(req.body);
  
      if (check && check.id) {
        res.status(200).json({ status: true, message: `${check.name} is added in database with ID: ${check.id}.` });
      } else {
        res.status(422).json({ status: false, message: "There was a problem while inserting in DB, please try again." });
      }
    }
}

const getObjectsByQuery = (model) => async (req, res, next)  => {
    let queryObj = {};
    Object.entries(req.query).forEach(([key,val]) => queryObj[key] = {$regex: `^${val}`})

    model.find(queryObj)
    .then(data => res.status(200).json({ message: `Success`, data}))
    .catch(err => res.status(400).json({ status: false, message: `Bad request!!  Could not fetch. Err: ${err}`}))
}

const updateObject = (model) => async (req, res, next)  => {
    const id = req.params.id;
    let [check] = await model.find({id});

    if (!check) return res.status(404).json({ status: false, message: `ID: ${id} is not available in DB`})

    model.findOneAndUpdate({id: id}, req.body, { new: true })
    .then((data) =>
      res.status(200).json({ data, message: `Success!! ${id} updated in DB` })
    )
    .catch(err =>
      res.status(400).json({ status: false, message: `ID ${id} could not be inserted, Err ${err}` })
    );
}

const deleteObject = (model) => async (req, res, next)  => {

    if (!req.params.id) return res.status(500).json({ status: false, message: "Wrong Request"});
  
    let [check] = await model.find({id: req.params.id});
    if (!check) {
        res.status(422).json({ status: false, message: `Resource doesnt exist!!`});
    } else {
        model.deleteOne({ id: req.params.id })
        .then(response =>
        res.status(200).json({ data: response, message: `Success!! Resource with id ${req.params.id} deleted.` })
        )
        .catch(err => 
        res.status(400).json({ status: false, message: `Could not delete the Resource. Request failed ! Error : ${err}` })
        );
    }
}


module.exports = (model) => {
    return(
        {
            getAllObjects: getAllObjects(model), 
            getObjectsByQuery: getObjectsByQuery(model),
            updateObject: updateObject(model),
            deleteObject: deleteObject(model),
            insertObject: insertObject(model)
        }
    )
}