const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  cart: [{
    type: Schema.Types.Mixed,
    ref: "Products",
    required: true
  }],
  funds: Number,
  locked: {
    type: Boolean,
    default: 0
  },
});

module.exports = mongoose.model("Users", UserSchema);
