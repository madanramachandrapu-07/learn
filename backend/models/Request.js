const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
}, {timestamps:true});

module.exports = mongoose.model("Request", requestSchema);
