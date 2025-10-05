import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string
}

export const userSchema = new Schema<IUser>({
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
})

export const User = mongoose.model<IUser>("user", userSchema)