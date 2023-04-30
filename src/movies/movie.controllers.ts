import { Request, Response } from "express";
import {
  addNewMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "./movie.services";

export const getAllMoviesController = async (req: Request, res: Response) => {
  const { _id: userId } = req.body;
  const { page, limit } = req.query;
  const movies = await getAllMovies(userId, Number(page), Number(limit));
  return res.status(200).json({ movies });
};

export const getMovieByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await getMovieById(id);
  return res.status(200).json({ movie });
};

export const addNewMovieController = async (req: Request, res: Response) => {
  const { title, director, releaseDate, _id: owner } = req.body;
  const movie = await addNewMovie(title, director, releaseDate, owner);

  return res.status(200).json({ movie });
};

export const updateMovieByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { _id, ...body } = req.body;
  const movie = await updateMovieById(id, body);
  return res.status(200).json({ message: "Movie update successfully", movie });
};

export const deleteMovieByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const deletedMovie = await deleteMovieById(id);
  return res
    .status(200)
    .json({ message: "Movie delete successfully", deletedMovie });
};
