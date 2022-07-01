import type { LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import * as api from "~/api/films";

/**
 * Клиент делает спецификацию данных, которые ему необходимы для отображения страницы.
 * Возвращаемое значение функции loader должно соответствовать этой спецификации.
 * Таким образом получается контракт между клиентом и сервером.
 *
 * Обычно клиенту нужна только грубая спецификация - форма данных, опционально ли
 * поле или нет - ровно то, что требуется знать для правильной отрисовки даннызх.
 * Для этих целей достаточно статической типизации. Более точная семантика не должна
 * волновать клиента и есть проблема сервера. Именно сервер должен проверять, чтобы
 * дата рождения не была больше даты поступления в ВУЗ, например.
 */
type Film = {
  id: string;
  title: string;
  description?: string | undefined;
  image?: string | undefined;
};

// on server
export const loader: LoaderFunction = ({ request }): Promise<Film[]> => {
  const title = new URL(request.url).searchParams.get("title");
  // должен соответствовать типу Film
  return api.getFilms(title);
};

// on client
export const meta = () => ({
  title: "Films | Studio Ghibli",
});

/**
 * Как посмотреть эту компоненту в изоляции в Storybook?
 */
export default function () {
  const films = useLoaderData<Film[]>();
  return (
    <div className="p-10 font-sans">
      <h1 className="text-4xl font-bold text-center pb-5">Studio Ghibli Films</h1>
      <SearchForm />
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

function SearchForm() {
  return (
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
  );
}
