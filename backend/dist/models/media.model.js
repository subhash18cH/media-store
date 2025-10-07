import { Schema, model, Document } from "mongoose";
const MediaSchema = new Schema({
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
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
}, { timestamps: true });
export const Media = model("Media", MediaSchema);
//# sourceMappingURL=media.model.js.map