import { dbRead } from "./utils";
import { getCommentsByFilmId } from "./comments";

async function readFilms() {
  /* алиас ~ резолвится на этапе транспиляции, поэтому нельзя
    делать динамический импорт по-типу
      function read(path) {
        let data = require(path)
        ...
      }
      read("~/data/films")    
  */
  return await dbRead(require("~/data/films"));
}

async function readCharacters() {
  return await dbRead(require("~/data/characters"));
}

export const getFilms = async (title) => {
  /*XXX spec
    загружаем данные из непроверенного источника
    надо проверять данные на соответствие спецификации
    смотри clojure spec
  */
  const films = Object.values(await readFilms());
  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
};

export const getFilmById = async (filmId) => {
  const films = await readFilms();
  const characters = await readCharacters();
  const comments = await getCommentsByFilmId(filmId);
  const film = films[filmId];
  return { ...film, characters: film.characters.map((pId) => characters[pId]), comments };
};

export const getCharacterById = async (characterId) => {
  const films = await readFilms();
  const characters = await readCharacters();
  const character = characters[characterId];
  return {
    ...character,
    films: character.films.map((filmId) => films[filmId]),
  };
};
