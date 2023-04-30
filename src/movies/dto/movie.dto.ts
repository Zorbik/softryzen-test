import { Types } from "mongoose";

export interface MovieDto {
  title: string;
  director: string;
  releaseDate: string;
  owner: Types.ObjectId;
}
