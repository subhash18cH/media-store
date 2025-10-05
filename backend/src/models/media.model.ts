import { Schema, model, Document } from "mongoose";

export interface IMedia extends Document {
  title: string;
  description?: string;
  url: string;
  cloudinaryId: String,
  type: String,
  ownerId: Schema.Types.ObjectId
}

const MediaSchema = new Schema<IMedia>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String
  },
  type: {
    type: String,
    default: "image"
  },
  ownerId:
  {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
}, { timestamps: true });

export const Media = model<IMedia>("Media", MediaSchema);
