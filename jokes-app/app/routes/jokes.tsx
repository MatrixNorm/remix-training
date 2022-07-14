import type { LinksFunction, LoaderFunction } from "@remix-run/node";
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
 * Problem: we LoaderData type manually
 * later in useLoaderData hook (look at (i)) to
 * allow TS to check correct data usage in component.
 */
type LoaderData = {
  jokeListItems: Array<Pick<Joke, "id" | "name">>;
};

export const loader: LoaderFunction = async () => {
  // THIS RUNS ON THE SERVER

  /**
   * We are specifying by hand that data is of LoaderData type. TS will
   * check that type returned by `await db.joke.findMany()` conforms to it.
   *
   * Network type safety
   * -------------------
   * Although TS can check that type of `await db.joke.findMany()`
   * conforms to LoaderData type, there is not guarantee that at runtime
   * value of `await db.joke.findMany()` conforms to LoaderData type specified
   * by the JokesRoute component. So runtime validation is needed. E.g. JSON Schema.
   * 1. first write JSON Schema
   * 2. then generate TS types from it. Use this types on the client inside
   *    components at useLoaderData.
   * 3. on the server validate at runtime values from database against JSON Schema
   */
  const data: LoaderData = {
    jokeListItems: await db.joke.findMany({
      /**
       * Assuming that code analizer has informed us
       * about data overfething we can narrow down
       * requested fields.
       */
      take: 5,
      select: { id: true, name: true },
      orderBy: { createdAt: "desc" },
    }),
  };
  return json(data);
};

export default function JokesRoute() {
  // THIS RUNS ON THE CLIENT

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
