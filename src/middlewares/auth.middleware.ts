import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { NotAuthorizeError } from "../helpers/errors";

dotenv.config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];

  verifyToken(
    accessToken || "",
    process.env.JWT_ACCESS_SECRET || "",
    req,
    next,
  );
};

export const refreshMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies?.refreshToken;

  verifyToken(
    refreshToken || "",
    process.env.JWT_REFRESH_SECRET || "",
    req,
    next,
  );
};

function verifyToken(
  token: string,
  secret: string,
  req: Request,
  next: NextFunction,
) {
  if (!token) {
    throw new NotAuthorizeError("Invalid token");
  }

  if (token) {
    try {
      const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload;
      req.body._id = decoded.id;
      next();
    } catch (error: any) {
      throw new NotAuthorizeError("Token expired");
    }
  }
}
