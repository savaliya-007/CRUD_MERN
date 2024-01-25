import mongoose, { Document } from "mongoose";

export interface UserType extends Document {
  username: string;
  role: string;
  email: string;
  password: string;
}

const UserScema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<UserType>("User", UserScema);
