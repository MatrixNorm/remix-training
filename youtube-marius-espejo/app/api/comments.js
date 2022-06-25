import { dbRead } from "./utils";

async function readComments() {
  return await dbRead(require("~/data/comments"));
}

export async function getCommentsByFilmId(filmId) {
  const comments = Object.values(await readComments());
  return comments.filter((comment) => comment.filmId === filmId);
}
