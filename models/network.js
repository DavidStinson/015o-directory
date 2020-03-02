const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networkSchema = new Schema({});

module.exports = mongoose.model("Network", networkSchema);
