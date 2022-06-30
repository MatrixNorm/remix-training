import type { Character, Film } from "./TypesFromJsonSchema";
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

const readFilms = () => dbRead(require("~/data/films"));
const readCharacters = () => dbRead(require("~/data/characters"));

export async function getFilms(title: string | null | undefined): Promise<Film[]> {
  const nonSafeFilms = Object.values(await dbRead(require("~/data/films")));

  const films = nonSafeFilms.filter((nonSafeFilm) =>
    validator.film(nonSafeFilm)
  ) as Film[];

  if (title) {
    return films.filter((film) => film.title.toLowerCase().includes(title.toLowerCase()));
  }
  return films;
}

export async function getFilmById(filmId: string) {
  const films = await readFilms();
  const characters = await readCharacters();
  const comments = await getCommentsByFilmId(filmId);

  const film = films[filmId] as Film;
  if (!validator.film(film)) {
    throw new Error("Bad film");
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
  const films = await readFilms();
  const characters = await readCharacters();

  const character = characters[characterId] as Character;
  if (!validator.film(character)) {
    throw new Error("Bad character");
  }
  const safeFilms = (character.films || [])
    .map((pId) => films[pId])
    .filter((film) => validator.film(film)) as Film[];

  return {
    ...character,
    films: safeFilms,
  };
};
