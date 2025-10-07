import { Media } from "../models/media.model.js";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import { User } from "../models/user.model.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMiddleware = upload.single("file");
//POST - /api/media/upload - for uploading media
export const uploadMedia = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.file);
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
        const uploaded = result;
        console.log(uploaded);
        const media = new Media({
            title,
            description,
            url: uploaded.secure_url,
            cloudinaryId: uploaded.public_id,
            type: uploaded.resource_type,
            ownerId: req?.user?.userId
        });
        await media.save();
        res.status(200).json(media);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
};
//GET - /api/media - get all media of current user
export const getAllMedia = async (req, res) => {
    try {
        const user_id = req.user?.userId;
        const user = User.findById(user_id);
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const media = await Media.find({ ownerId: user_id }).sort({ createdAt: -1 });
        res.status(200).json(media);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch media" });
    }
};
//# sourceMappingURL=media.controller.js.map