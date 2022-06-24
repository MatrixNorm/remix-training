export const getFilms = async (title) => {
  /*XXX spec
    загружаем данные из непроверенного источника
    надо проверять данные на соответствие спецификации
    смотри clojure specI
  */
  await sleep(200);
  let films = readData("~/data/films");
  films = Object.values(films);
  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
};

export const getFilmById = async (filmId) => {
  await sleep(200);
  const films = readData("~/data/films");
  const people = readData("~/data/people");
  const film = films[filmId];
  return { ...film, characters: film.people.map((pId) => people[pId]) };
};

export const getCharacterById = async (characterId) => {
  await sleep(200);
  const people = readData("~/data/people");
  const films = readData("~/data/films");
  const character = people[characterId];
  console.log(people[characterId]);
  return {
    ...people[characterId],
    films: character.films.map((filmId) => films[filmId]),
  };
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readData(path) {
  const data = require(path);
  // for immutability
  return JSON.parse(JSON.stringify(data));
}
