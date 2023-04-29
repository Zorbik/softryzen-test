import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

import { CreateUserDto } from "./dto/create-user.dto";

export interface UserDocument extends CreateUserDto, Document {}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: { accessToken: { type: String }, refreshToken: { type: String } },
});

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const User = model<UserDocument>("Users", userSchema);
