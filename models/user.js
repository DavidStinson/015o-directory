const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    email: String,
    userId: String,
    oAuthProvider: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
