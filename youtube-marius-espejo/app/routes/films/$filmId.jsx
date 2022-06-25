import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getFilmById } from "~/api/films";

export const loader = ({ params }) => {
  return getFilmById(params.filmId);
};

export default function () {
  const film = useLoaderData();
  return (
    <div>
      <div>
        {film.title} <Link to="/films">Go back</Link>
      </div>
      <img src={film.movie_banner} alt={film.title} />
      <div className="p-10">{film.description}</div>
      <div className="flex">
        <div>
          <h3 className="text-2xl">Characters</h3>
          <ul>
            {film.characters.map((character) => (
              <li className="p-2">
                <NavLink
                  to={`characters/${character.id}`}
                  className={({ isActive }) =>
                    `hover:underline ${
                      isActive ? "font-bold text-black" : "text-blue-500"
                    }`
                  }
                >
                  {character.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <Outlet />
          <div>
            <h2>Comments</h2>
            <div>
              {film.comments.map((comment) => (
                <div>
                  <div>{comment.name}</div>
                  <p>{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
