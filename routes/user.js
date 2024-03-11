import express from "express";
import { User } from "../modules/user.js";
import { getuser, login, logout, register } from "../controllers/user.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.get("/users/getuser", getuser);
router.get("/users/logout", logout);
router.post("/users/login", login);
router.post("/users/register", upload.single('image'), register);

export default router;
