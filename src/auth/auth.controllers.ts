import { Request, Response } from "express";
import {
  createUser,
  currentUser,
  deleteUser,
  logInUser,
  logOut,
} from "./auth.services";

export const registreUserController = async (req: Request, res: Response) => {
  const response = await createUser(req.body);
  const { __v, password, ...user } = response.toObject();

  return res
    .status(201)
    .json({ message: "User registered successfully", user });
};

export const logInUserController = async (req: Request, res: Response) => {
  const response = await logInUser(req.body);
  const { __v, password, ...user } = response.toObject();

  return res
    .status(200)
    .json({ message: "User authorization successfully", user });
};

export const currentUserController = async (req: Request, res: Response) => {
  const response = await currentUser(req.body._id);
  const { __v, password, ...user } = response.toObject();

  return res
    .status(200)
    .json({ message: "User authorization successfully", user });
};

export const logOutController = async (req: Request, res: Response) => {
  await logOut(req.body._id);
  return res.status(200).json({ message: "Logout successfully" });
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUser(id);
  return res.status(200).json({ message: "User deleted successfully" });
};
