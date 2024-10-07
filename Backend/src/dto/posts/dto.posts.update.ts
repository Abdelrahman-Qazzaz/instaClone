import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { CreatePostDTO } from "./dto.posts.create.ts";
import { transformToNumber } from "../utils/helper functions/transformToNumber.ts";

export class UpdatePostDTO extends CreatePostDTO {}
