import { z } from "zod";
import { dbRead } from "./utils";

// type Film = {
//   id: string;
//   title: string;
//   image: string;
//   movie_banner: string;
//   description: string;
//   release_date: string;
//   comments: Comment[];
// };

type Comment = {
  id: string;
  name: string;
  message: string;
  film: Film;
};

const Comment: z.ZodType<Comment> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    message: z.string(),
    film: Film,
  })
);

const Film = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(),
    movie_banner: z.string(),
    description: z.string(),
    release_date: z.string(),
    comments: z.array(Comment),
  })
);

type Film = z.infer<typeof Film>;

async function readComments() {
  return await dbRead(require("~/data/comments"));
}

export async function getCommentsByFilmId(filmId) {
  const comments = Object.values(await readComments());
  return comments.filter((comment) => comment.filmId === filmId);
}
