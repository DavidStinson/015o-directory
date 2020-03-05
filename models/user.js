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

const deviceSchema = new Schema(
  {
		deviceClass: String,
		os: String,
    macAddress: String,
		ipAddresses: String,
		dnsName: String,
		destInterface: String,
		pathToDestPort: String,
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
    devices: [deviceSchema],
    oAuthProvider: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
