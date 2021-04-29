const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  id: String,
  userName:String,
  status: String,
  cart: [{
    type: Schema.Types.Mixed,
    ref: "CartProducts",
    required: true
  }],
  date: String
});

module.exports = mongoose.model("Orders", OrderSchema);
