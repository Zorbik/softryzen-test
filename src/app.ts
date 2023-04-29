import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  currentUserController,
  logInUserController,
  logOutController,
  registreUserController,
} from "./auth/auth.controllers";
import { asyncWrapper, errorHandler } from "./helpers/apiHelpers";
import {
  authMiddleware,
  refreshMiddleware,
} from "./middlewares/auth.middleware";
import {
  addNewMovieController,
  getAllMoviesController,
  getMovieByIdController,
} from "./movies/movie.controllers";
import { validationMiddleware } from "./middlewares/validation.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/register", asyncWrapper(registreUserController));
app.post("/login", asyncWrapper(logInUserController));

app.use(authMiddleware);

app.get("/user", refreshMiddleware, asyncWrapper(currentUserController));
app.post("/logout", asyncWrapper(logOutController));

app.get("/movies", asyncWrapper(getAllMoviesController));
app.get("/movies/id/:id", asyncWrapper(getMovieByIdController));
app.post("/movies", validationMiddleware, asyncWrapper(addNewMovieController));

app.use(errorHandler);

export default app;
