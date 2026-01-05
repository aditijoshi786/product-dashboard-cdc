import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  imageUrl: String,
  imagePublicId: String
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

