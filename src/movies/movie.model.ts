import { Document, Schema, SchemaTypes, model } from "mongoose";
import { MovieDto } from "./dto/movie.dto";

export interface MovieDocument extends MovieDto, Document {}

const movieSchema = new Schema<MovieDocument>({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: String, required: true },
  owner: { type: SchemaTypes.ObjectId, required: true },
});

export const Movie = model<MovieDocument>("Movies", movieSchema);
