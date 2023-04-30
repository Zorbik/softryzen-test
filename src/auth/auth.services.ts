import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { LogInUserDto } from "./dto/login-user.dto";
import { User } from "./user.model";
import {
  NotAuthorizeError,
  RegistrationConflictError,
} from "../helpers/errors";

dotenv.config();

export const createUser = async (dto: CreateUserDto) => {
  const isUser = await User.findOne({ email: dto.email });

  if (isUser) {
    throw new RegistrationConflictError("Email in use");
  }

  const user = await User.create(dto);

  user.tokens = addTokens(user._id);
  await user.save();
  return user;
};

export const logInUser = async (dto: LogInUserDto) => {
  const user = await User.findOne({ email: dto.email });

  if (!user) {
    throw new NotAuthorizeError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(dto.password, user.password))) {
    throw new NotAuthorizeError("Email or password is wrong");
  }

  user.tokens = addTokens(user._id);
  await user.save();
  return user;
};

export const currentUser = async (id: Types.ObjectId) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAuthorizeError("User not authorized");
  }

  const newTokens = addTokens(id);
  user.tokens = { ...user.tokens, ...newTokens };
  await user.save();
  return user;
};

export const logOut = async (id: Types.ObjectId) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAuthorizeError("User not authorized");
  }

  user.tokens = { accessToken: "", refreshToken: "" };
  await user.save();
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

function addTokens(id: Types.ObjectId) {
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET || "", {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || "", {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
}
