import { useLoaderData } from "@remix-run/react";
import { getFilm } from "~/api/films";

export const loader = ({ params }) => {
  console.log("fetching film...", params.filmId)
  return getFilm(params.filmId);
};

export default function () {
  const film = useLoaderData();
  return (
    <div>
      <div>{film.title}</div>
      <img src={film.image} alt={film.title} />
    </div>
  );
}
