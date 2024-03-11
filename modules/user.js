import mongoose from "mongoose";
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    unique: true,
  },
  profilePic: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
export const User = mongoose.model("User", schema);