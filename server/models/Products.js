const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: String,
  // name: String,
  quantity: Number,
});

module.exports = mongoose.model("Products", ProductSchema);
