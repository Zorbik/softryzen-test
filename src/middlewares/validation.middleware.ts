import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../helpers/errors";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    director: Joi.string().min(3).max(30).required(),
    releaseDate: Joi.date().max("now").required(),
  });

  const { title, director, releaseDate } = req.body;
  const validationData = schema.validate({ title, director, releaseDate });
  console.log("validationData:", validationData);

  if (validationData.error) {
    next(
      new CustomError(
        `Validation error. Missing required ${validationData.error.details[0].path} field`,
      ),
    );
  }
  next();
};
