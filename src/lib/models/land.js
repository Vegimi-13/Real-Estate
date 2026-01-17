import mongoose from "mongoose";

const LandSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    size: String,
    sizeUnit: {
      type: String,
      enum: ["m²", "ari", "hektare"],
      default: "m²",
    },
    propertyType: {
      type: String,
      enum: ["Toke", "Shtepi", "Banese"],
      default: "Toke",
    },
    price: String,
    description: String,
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Land || mongoose.model("Land", LandSchema);
