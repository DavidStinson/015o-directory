const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networkSchema = new Schema(
  {
    broadcastAddr: String,
    cidrMask: Number,
    dnsServerAddr: String,
    friendlyName: String,
    ipRange: String,
    ntwkAddr: String,
    routerAddr: String,
    subnetMask: String,
    vLan: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Network", networkSchema);
