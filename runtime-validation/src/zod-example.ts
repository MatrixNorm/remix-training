import { z } from "zod";

type Director = {
  id: string;
  name: string;
  films: Film[];
};

const Director: z.ZodType<Director> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    films: z.array(Film),
  })
);

const Film = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    director: Director,
  })
);

type Film = z.infer<typeof Film>;
type Director_ = z.infer<typeof Director>;

console.log(
  Film.safeParse({
    id: "1",
    title: "asdf",
    comments: [{ id: "c1", message: "qwerty", film: {id: "1", title: "asdf"} }],
  })
);
