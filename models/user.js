const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networkSchema = new Schema(
  {
    broadcastAddr: String,
    cidrMask: Number,
    firstAddr: String,
    friendlyName: String,
    fullNtwk: String,
    lastAddr: String,
    ntwkAddr: String,
    ntwkSize: Number,
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
