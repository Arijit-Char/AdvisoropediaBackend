import { Posts } from "../modules/posts.js";
export const allposts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const posts = await Posts.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            posts,
        });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
