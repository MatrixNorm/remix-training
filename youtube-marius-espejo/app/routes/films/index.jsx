import { useLoaderData } from "@remix-run/react";
import { getFilms } from "~/api/films";

// on server
export const loader = () => {
  return getFilms();
};

// on client
export const meta = () => ({
  title: "Films | Studio Ghibli",
});

export const links = () => [
  {
    rel: "stylesheet",
    href: "styles",
  },
];

export default function () {
  const films = useLoaderData();
  return (
    <div className="p-10 font-sans">
      <h1 className="text-4xl font-bold text-center pb-5">Studio Ghibli Films</h1>

      <form className="mb-5">
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
      </form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <div>
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
