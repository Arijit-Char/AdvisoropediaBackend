import mongoose from "mongoose";
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});
export const Posts = mongoose.model("Posts", schema);