import type { Character, Film } from "./TypesFromJsonSchema";
import Ajv from "ajv";
import * as filmRestApiSchema from "./schema/film.json";
import * as characterRestApiSchema from "./schema/character.json";
import { dbRead, isMap } from "./utils";
import { getCommentsByFilmId } from "./comments";

const ajv = new Ajv();

const validator = {
  film: ajv.compile(filmRestApiSchema),
  character: ajv.compile(characterRestApiSchema),
};

function coerceFilm(film: unknown) {
  if (isMap(film) && film?.release_date) {
    return { ...film, release_date: +film.release_date };
  }
  return film;
}

const _readFilms = () => dbRead(require("~/data/films"));
const _readCharacters = () => dbRead(require("~/data/characters"));

export async function getFilms(title: string | null | undefined): Promise<Film[]> {
  const nonSafeFilms = Object.values(await dbRead(require("~/data/films")));

  const films = nonSafeFilms.filter((nonSafeFilm) =>
    validator.film(coerceFilm(nonSafeFilm))
  ) as Film[];

  if (title) {
    return films.filter((film) => film.title.toLowerCase().includes(title.toLowerCase()));
  }
  return films;
}

export async function getFilmById(filmId: string) {
  const films = await _readFilms();
  const characters = await _readCharacters();
  const comments = await getCommentsByFilmId(filmId);

  if (!(filmId in films)) {
    return null;
  }
  const film = coerceFilm(films[filmId]) as Film;
  if (!validator.film(film)) {
    throw new Error("Film data does not conform to schema");
  }
  const safeCharacters = (film.characters || [])
    .map((pId) => characters[pId])
    .filter((character) => validator.character(character)) as Character[];

  return {
    ...film,
    characters: safeCharacters,
    comments,
  };
}

export const getCharacterById = async (characterId: string) => {
  const films = await _readFilms();
  const characters = await _readCharacters();

  const character = characters[characterId] as Character;
  if (!validator.film(character)) {
    throw new Error("Character data does not conform to schema");
  }
  const safeFilms = (character.films || [])
    .map((pId) => films[pId])
    .filter((film) => validator.film(film)) as Film[];

  return {
    ...character,
    films: safeFilms,
  };
};
