const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  _id: String,
  user_id: String,
  status: String,
  list: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total_bill: Number,
  timestamp: Date,
});

module.exports = mongoose.model("Orders", OrderSchema);
