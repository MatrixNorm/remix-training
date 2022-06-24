import { useLoaderData } from "@remix-run/react";
import { getCharacterById } from "~/api/films";

export const loader = ({ params }) => {
  console.log("fetching character...", params.characterId);
  return getCharacterById(params.characterId);
};

export default function () {
  const character = useLoaderData();
  return (
    <div>
      <div>{character.name}</div>
      <ul>
        {character.films.map((film) => (
          <li>{film.title}</li>
        ))}
      </ul>
    </div>
  );
}
