const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interfaceSchema = new Schema({
  speed: String,
  device: {
    type: Schema.Types.ObjectId,
    ref: "Device",
  },
});

module.exports = mongoose.model("Interface", interfaceSchema);
