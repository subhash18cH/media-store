import mongoose, { Document, Schema } from "mongoose";
export const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
export const User = mongoose.model("user", userSchema);
//# sourceMappingURL=user.model.js.map