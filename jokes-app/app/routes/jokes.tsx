import type { LinksFunction, LoaderFunction } from "@remix-run/node";
// Joke type is generated by Prisma from database schema.
import type { Joke } from "@prisma/client";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import stylesUrl from "~/styles/jokes.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};
/**
 * Specifying data needed to display page
 * Problem: we need specify this type manually
 * later in useLoaderData hook (look at (i)) to
 * allow TS to check correct data usage in component.
 */
type LoaderData = {
  jokeListItems: Array<Joke>;
};

export const loader: LoaderFunction = async () => {
  /**
   * We are specifying by hand that data is of LoaderData type. TS will
   * check that valure ruturned by `await db.joke.findMany()` conforms to it.
   */
  const data: LoaderData = {
    jokeListItems: await db.joke.findMany(),
  };
  return json(data);
};

export default function JokesRoute() {
  /*(i)*/
  const data = useLoaderData<LoaderData>();
  /**
   * Data overfetching problem
   * -------------------------
   * The component is using only joke `id` and `name`.
   * No need to fetch `content`, `createdAt` and `updatedAt` fields.
   * Sufficiently smart code analyzer can infer necessary shape of `data`
   * object by looking at component's source code. And inform us that LoaderData
   * type has more fields than necessary so overfetching is possible.
   */
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.jokeListItems.map((joke) => (
                <li key={joke.id}>
                  <Link to={joke.id}>{joke.name}</Link>
                </li>
              ))}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
