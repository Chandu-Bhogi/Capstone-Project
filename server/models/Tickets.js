const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  _id: String,
  complainant_id: String,
  description: String,
});

module.exports = mongoose.model("Tickets", TicketSchema);
