import { Form, Link, useLoaderData } from "@remix-run/react";
import { getFilms } from "~/api/films";

// on server
export const loader = ({ request }) => {
  const title = new URL(request.url).searchParams.get("title");
  return getFilms(title);
};

// on client
export const meta = () => ({
  title: "Films | Studio Ghibli",
});

export default function () {
  const films = useLoaderData();
  return (
    <div className="p-10 font-sans">
      <h1 className="text-4xl font-bold text-center pb-5">Studio Ghibli Films</h1>

      <Form reloadDocument className="mb-5">
        <label className="font-bold">
          Search
          <input
            type="text"
            name="title"
            placeholder="Type a title..."
            className="border-2 rounded py-2 px-3 ml-3"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mx-2"
          >
            Search
          </button>
        </label>
      </Form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <Link
            to={film.id}
            title={film.title}
            key={film.id}
            className="hover:scale-105 cursor-pointer"
            prefetch="none"
          >
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}
