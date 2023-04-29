import { Types } from "mongoose";

export interface MovieDto {
  title: string;
  director: string;
  releaseDate: Date;
  owner: Types.ObjectId;
}
