import { Types } from "mongoose";
import { Movie } from "./movie.model";
import { MovieDto } from "./dto/movie.dto";
import { CustomError } from "../helpers/errors";

export const getAllMovies = async (
  owner: Types.ObjectId,
  page: number,
  limit: number,
) => {
  return await Movie.find({ owner }, { __v: 0, owner: 0 })
    .limit(limit)
    .skip((page - 1) * limit);
};

export const getMovieById = async (id: string) => {
  return await Movie.findById(id, { __v: 0, owner: 0 });
};

export const addNewMovie = async (
  title: string,
  director: string,
  releaseDate: Date,
  owner: string,
) => {
  const date = new Date(releaseDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, "-")
    .toString();

  return await Movie.create({
    title,
    director,
    releaseDate: formattedDate,
    owner,
  });
};

export const updateMovieById = async (id: string, body: MovieDto) => {
  const movie = await Movie.findByIdAndUpdate(id, { ...body }, { new: true });
  if (!movie) {
    return new CustomError("Movie not found");
  }

  return movie;
};

export const deleteMovieById = async (id: string) => {
  return await Movie.findByIdAndDelete(id);
};
