const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

module.exports = mongoose.model("employees", EmployeeSchema);
