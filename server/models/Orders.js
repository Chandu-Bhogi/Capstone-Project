const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  id: String,
  recipient: {
    type: Schema.Types.Mixed,
    ref: "Users",
    required: true
  },
  status: String,
  list: [{
    type: Schema.Types.Mixed,
    ref: "Products",
    required: true
  }],
  total_bill: Number,
});

module.exports = mongoose.model("Orders", OrderSchema);
