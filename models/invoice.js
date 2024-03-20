const mongoose = require("mongoose");
const invoiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    enum: ["Pay on Delivery", "UPI", "Card"],
    required: true,
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  totalBill: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Invoice", invoiceSchema);
