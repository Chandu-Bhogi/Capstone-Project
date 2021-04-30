const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  first_name: String,
  last_name: String,
  email: String,
  phone_number: String,
  address: String,
  password: String,
  cart: [
    {
      type: Schema.Types.Mixed,
      ref: "Products",
      required: true,
      quantity: Number,
    },
  ],
  cart_total: Number,
  funds: {
    type: Number,
    default: 0,
  },
  account_number: Number,
  locked: {
    type: Boolean,
    default: 0,
  },
  user_type: Number, // 0: Admin, 1: employee, 2: client
});

module.exports = mongoose.model("Users", UserSchema);
