import { useLoaderData, useParams } from "@remix-run/react";
import { getCharacterById } from "~/api/films";

export const loader = ({ params }) => {
  return getCharacterById(params.characterId);
};

export default function () {
  const character = useLoaderData();
  const urlParams = useParams();

  const alsoStarringInFilms = character.films.filter(
    (film) => film.id !== urlParams.filmId
  );

  return (
    <div>
      <div>Character details</div>
      <div className="font-bold text-xl">{character.name}</div>
      {alsoStarringInFilms.length > 0 ? (
        <div>
          <h3>Also starring in films</h3>
          <ul>
            {alsoStarringInFilms.map((film) => (
              <li>{film.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
