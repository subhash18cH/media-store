import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//POST - /api/auth/register - for registering a user
export const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });
        res.status(201).json("user registered successfully");
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//POST - /api/auth/login - for login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({
            userId: user._id,
            name: user.userName,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            token,
            user: {
                userId: user._id,
                name: user.userName,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
//# sourceMappingURL=user.controller.js.map