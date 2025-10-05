import type { Request, Response } from "express";
import { Media } from "../models/media.model.js";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";
import { User } from "../models/user.model.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.single("file");

//POST - /api/media/upload - for uploading media
export const uploadMedia = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file!.buffer).pipe(uploadStream);
    });

    const uploaded: any = result;

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
    res.status(201).json(media);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};

//GET - /api/media - get all media of current user
export const getAllMedia = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch media" });
  }
};

//GET - /api/media/:id - get media of current user by media id
export const getMediaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id);

    if (!media) {
      res.status(404).json({ error: 'Media file not found' });
      return;
    }

    res.status(200).json({
      message: 'Media file retrieved successfully', data: media,
    });

  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch media file' });
  }
};

//DELETE - /api/media/:id - delete media of current user by media id
export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    if (!media) {
      res.status(404).json({ error: 'Media file not found' });
      return;
    }
    await cloudinary.uploader.destroy(media.cloudinaryId.toString(), {
      resource_type: media.type.toString(),
    });

    await Media.findByIdAndDelete(id);
    res.status(200).json({ message: 'Media file deleted successfully' });
  } catch (error: any) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete media file' });
  }
};

//GET - /api/media/:id/stream - get streaming media of current user by media id
export const streamMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    if (!media) {
      res.status(404).json({ error: 'Media file not found' });
      return;
    }
    res.redirect(media.url);
  } catch (error: any) {
    console.error('Stream error:', error);
    res.status(500).json({ error: 'Failed to stream media file', });
  }
};
