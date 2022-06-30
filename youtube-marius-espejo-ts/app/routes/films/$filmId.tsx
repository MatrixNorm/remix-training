import type { LoaderFunction } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getFilmById } from "~/api/films";

/**
 * Note: Похоже на Graphql фрагмент из Relay.
 */
type Film = {
  id: string;
  title: string;
  description?: string | undefined;
  image?: string | undefined;
  movie_banner?: string | undefined;
  characters: {
    id: string;
    name: string;
  }[];
  comments: {
    id: string;
    name: string;
    message: string;
  }[];
};

export const loader: LoaderFunction = ({ params }): Promise<Film> => {
  if (params.filmId) {
    return getFilmById(params.filmId);
  }
  throw new Error("XXX");
};

export default function () {
  const film = useLoaderData<Film>();
  return (
    <div>
      <div>
        {film.title} <Link to="/films">Go back</Link>
      </div>
      <img src={film.movie_banner} alt={film.title} />
      <div className="p-10">{film.description}</div>
      <div className="flex">
        <Characters characters={film.characters} />
        <div className="flex-1">
          <Outlet />
          <Comments comments={film.comments} />
        </div>
      </div>
    </div>
  );
}

function Characters({ characters }: { characters: Film["characters"] }) {
  return (
    <div>
      <h3 className="text-2xl">Characters</h3>
      <ul>
        {characters.map((character) => (
          <li className="p-2">
            <NavLink
              to={`characters/${character.id}`}
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-bold text-black" : "text-blue-500"}`
              }
            >
              {character.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Comments({ comments }: { comments: Film["comments"] }) {
  return (
    <div>
      <h2>Comments</h2>
      <div>
        {comments.map((comment) => (
          <div>
            <div>{comment.name}</div>
            <p>{comment.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
