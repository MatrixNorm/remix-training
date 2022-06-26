import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getFilmById } from "~/api/films";

export const loader = ({ params }) => {
  return getFilmById(params.filmId);
};

export default function () {
  const film = useLoaderData();
  /**
   * Понятие не имеем что такое film. Какие атрибуты и форма у этого объекта?
   * Соответствует ли его форма тому, что запрашивается в рендере?
   * Например, рендер подразумевает наличие атрибута film.characters, который
   * должен быть массивом объектом с полями name, gender, age. Таким образом,
   * рендер неявно задаёт спецификацию на данные, которые ему нужны.
   *
   * Можно в явном виде объявить форму данных. Например, в Relay это делается
   * через Graphql декларацию вида
   *  film {
   *     id,
   *     title,
   *     characters {
   *       id
   *       name
   *     }
   *  }
   * Так как имеется Graphql схема, Relay  компилятор может сгенерить тип для
   * Typescript или Flow, который надо будет руками импортировать и обозначить им
   * переменную film. Дальше будет работать чекер типов, который будет отлавливать
   * целый класс ошибок в рендере: запрашивается несуществующий атрибут, не обрабатывается
   * опциональность атрибута и пр.
   */
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

function Characters({ characters }) {
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

function Comments({ comments }) {
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
