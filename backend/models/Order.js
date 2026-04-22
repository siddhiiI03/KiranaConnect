import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shopName: String,
  product: String,
  quantity: Number,
  price: Number,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);