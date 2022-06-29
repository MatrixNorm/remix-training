import { dbRead } from "./utils";

async function readComments() {
  /*
    Загрузка внешних данных, в которых может быть всё-что угодно.
  */
  return await dbRead(require("~/data/comments"));
}

export async function getCommentsByFilmId(filmId) {
  const comments = Object.values(await readComments());
  return comments.filter((comment) => comment.filmId === filmId);
}
