import mongoose, { Schema, Document } from "mongoose";

interface UserData extends Document {
  googleId: string;
  email: string;
  name: string;
  picture: string;
}

const authSchema: Schema<UserData> = new Schema({
  googleId: String,
  email: String,
  name: String,
  picture: String,
});

export const Auth = mongoose.model("Auth", authSchema);
