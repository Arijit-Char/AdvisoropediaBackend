import { User } from "../modules/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

import cloudinary from "../utils/cloudinary.js";
import upload from "../middlewares/multer.js";
export const getuser = async (req, res) => {
    try {
        const id = req.query.id;
        const users = await User.findById(id);
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const logout = (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            user: req.user,
        });
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("user not found", 400));
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid credentials", 400));
        sendCookie(user, res, "Logged in successfully", 200);
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exists", 400));
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = await cloudinary.uploader.upload(req.file.path, () => {
            console.log("Profile image uploaded successfully");
        })
        const imageUri = result.url;

        user = await User.create({
            name, email, password: hashedPassword, profilePic: imageUri
        });
        console.log(user);

        sendCookie(user, res, "User created successfully", 201);




    } catch (error) {
        next(error);
    }
};
