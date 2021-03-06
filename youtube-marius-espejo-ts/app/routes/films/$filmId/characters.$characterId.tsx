import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { getCharacterById } from "~/api/films";

type Character = {
  id: string;
  name: string;
  films: {
    id: string;
    title: string;
  }[];
};

export const loader: LoaderFunction = async ({ params }): Promise<Character> => {
  if (params.characterId) {
    const character = await getCharacterById(params.characterId);
    if (!character) {
      throw new Response("Not Found", {
        status: 404,
      });
    }
    return character;
  }
  throw new Response("Not Found", {
    status: 404,
  });
};

export default function () {
  const character = useLoaderData<Character>();
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
