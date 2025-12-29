import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  name: String,
  type: String,
  valueSource: String,
  ticker: String,
  quantity: Number,
  manualValue: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Asset", AssetSchema);
