const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  id: String,
  complainant: {
    type: Schema.Types.Mixed,
    ref: "Users",
    required: true
  },
  description: String,
});

module.exports = mongoose.model("Products", TicketSchema);
