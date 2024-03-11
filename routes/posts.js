import express from "express";
import { Posts } from "../modules/posts.js";
import { isAuthenticated } from "../middlewares/auth.js"
import { allposts } from "../controllers/posts.js";
const router = express.Router();

router.get("/posts", allposts);



export default router;
