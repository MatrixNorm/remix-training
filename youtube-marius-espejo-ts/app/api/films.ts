import type { Character, Film } from "./restEndpoints";
import Ajv from "ajv";
import * as filmRestApiSchema from "./schema/film.json";
import * as characterRestApiSchema from "./schema/character.json";
import { dbRead } from "./utils";
import { getCommentsByFilmId } from "./comments";

const ajv = new Ajv();
const validator = {
  film: ajv.compile(filmRestApiSchema),
  character: ajv.compile(characterRestApiSchema),
};

async function readFilms() {
  /* алиас ~ резолвится на этапе транспиляции, поэтому нельзя
    делать динамический импорт по-типу
      function read(path) {
        let data = require(path)
        ...
      }
      read("~/data/films")    
  */
  const externalData = await dbRead(require("~/data/films"));
  const goodEntries = Object.entries(externalData).filter(([filmId, filmExt]) =>
    validator.film(filmExt)
  );
  return Object.fromEntries(goodEntries) as {
    [k: string]: Film;
  };
}

async function readCharacters() {
  const externalData = await dbRead(require("~/data/characters"));
  const goodEntries = Object.entries(externalData).filter(([charId, charExt]) =>
    validator.character(charExt)
  );
  return Object.fromEntries(goodEntries) as {
    [k: string]: Character;
  };
}

export const getFilms = async (title: string) => {
  /*XXX spec
    загружаем данные из непроверенного источника
    надо проверять данные на соответствие спецификации
    смотри clojure spec
  */
  const films = Object.values(await readFilms());
  if (title) {
    return films.filter((film) => film.title.toLowerCase().includes(title.toLowerCase()));
  }
  return films;
};

export const getFilmById = async (filmId: string) => {
  const films = await readFilms();
  const characters = await readCharacters();
  const comments = await getCommentsByFilmId(filmId);
  const film = films[filmId];
  return {
    ...film,
    characters: (film.characters || []).map((pId) => characters[pId]),
    comments,
  };
};

export const getCharacterById = async (characterId: string) => {
  const films = await readFilms();
  const characters = await readCharacters();
  const character = characters[characterId];
  return {
    ...character,
    films: (character.films || []).map((filmId) => films[filmId]),
  };
};
