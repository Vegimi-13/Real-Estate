import mongoose from "mongoose";

const LandSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    size: String,
    price: String,
    description: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Land || mongoose.model("Land", LandSchema);
