const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    email: String,
    userId: String,
    oAuthProvider: String,
    local: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
