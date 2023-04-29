import express, { NextFunction, Request, Response } from "express";
import { CustomError } from "./errors";

interface IErrorRequestHandler extends express.ErrorRequestHandler {}

export const asyncWrapper = (controller: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res).catch(next);
  };
};

export const errorHandler: IErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    console.log("error", error);

    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
  next();
};
