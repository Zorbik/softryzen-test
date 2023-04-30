import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomError } from "../helpers/errors";

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "any.required": "The title is required.",
      "string.base": "The title must be a string.",
      "string.min": "The title must be at least 3 characters long.",
      "string.max": "The title must be no more than 100 characters long.",
    }),
    director: Joi.string().min(3).max(30).required().messages({
      "any.required": "The director is required.",
      "string.base": "The director must be a string.",
      "string.min": "The director must be at least 3 characters long.",
      "string.max": "The director must be no more than 30 characters long.",
    }),
    releaseDate: Joi.date().max("now").required().messages({
      "any.required": "The release date is required.",
      "date.base": "The release date must be a valid date.",
      "date.max": "The release date cannot be in the future.",
    }),
  });

  const { title, director, releaseDate } = req.body;
  const validationData = schema.validate({ title, director, releaseDate });

  if (validationData.error) {
    next(new CustomError(validationData.error.details[0].message));
  }
  next();
};
