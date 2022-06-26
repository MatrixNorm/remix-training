import { z } from "zod";

type Comment = {
  id: string;
  message: string;
  film: Film;
};

const Comment: z.ZodType<Comment> = z.lazy(() =>
  z.object({
    id: z.string(),
    message: z.string(),
    film: Film,
  })
);

const Film = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    comments: z.array(Comment),
  })
);

type Film = z.infer<typeof Film>;

console.log(
  Film.safeParse({
    id: "1",
    title: "asdf",
    comments: [{ id: "c1", message: "qwerty", film: {id: "1", title: "asdf"} }],
  })
);
