import Ajv from "ajv";
import type { Comment } from "./TypesFromJsonSchema";
import * as commentRestApiSchema from "./schema/comment.json";
import { dbRead } from "./utils";

const ajv = new Ajv();

const commentValidator = ajv.compile(commentRestApiSchema);

export async function getCommentsByFilmId(filmId: string) {
  const nonSafeComments = Object.values(await dbRead(require("~/data/comments")));

  const comments = nonSafeComments.filter((comment) =>
    commentValidator(comment)
  ) as Comment[];

  return comments.filter((comment) => comment.filmId === filmId);
}
