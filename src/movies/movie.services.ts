import { Types } from "mongoose";
import { Movie } from "./movie.model";
import { MovieDto } from "./dto/movie.dto";

export const getAllMovies = async (
  owner: Types.ObjectId,
  page: number,
  limit: number,
) => {
  return await Movie.find(owner, { __v: 0, owner: 0 })
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
  return await Movie.create({ title, director, releaseDate, owner });
};
