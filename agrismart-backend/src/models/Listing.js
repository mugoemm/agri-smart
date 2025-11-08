import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cropName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ["kg", "bag", "crate"], default: "kg" },
  pricePerUnit: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model("Listing", listingSchema);
