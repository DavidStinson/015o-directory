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
    vLAN: Number,
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    email: String,
    local: Boolean,
    networks: [networkSchema],
    oAuthProvider: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
