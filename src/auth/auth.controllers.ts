import { Request, Response } from "express";
import { createUser, currentUser, logInUser, logOut } from "./auth.services";

export const registreUserController = async (req: Request, res: Response) => {
  return controller(
    createUser,
    req.body,
    201,
    "User registered successfully",
    res,
  );
};

export const logInUserController = async (req: Request, res: Response) => {
  return controller(
    logInUser,
    req.body,
    200,
    "User authorization successfully",
    res,
  );
};

export const currentUserController = async (req: Request, res: Response) => {
  return controller(
    currentUser,
    req.body._id,
    200,
    "User authorization successfully",
    res,
  );
};

export const logOutController = async (req: Request, res: Response) => {
  await logOut(req.body._id);
  return res.status(200).json({ message: "Logout successfully" });
};

async function controller(
  func: Function,
  query: any,
  status: number,
  message: string,
  res: Response,
) {
  const response = await func(query);
  const { __v, password, ...user } = response.toObject();

  return res.status(status).json({ message: message, user });
}
