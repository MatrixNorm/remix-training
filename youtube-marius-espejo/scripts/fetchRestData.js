exports.getFilms = async function () {
  const resp = await fetch("https://ghibliapi.herokuapp.com/films");
  let films = await resp.json();
  films = films.map((film) => ({
    id: film.id,
    title: film.title,
    image: film.image,
    movie_banner: film.movie_banner,
    description: film.description,
    release_date: film.release_date,
    people: extractPeopleIds(film.people),
  }));
  return Object.fromEntries(films.map(f => [f.id, f]))
}

function extractPeopleIds(peopleURLArray) {
  return peopleURLArray
    .filter((URL) => !URL.endsWith("/people/"))
    .map((URL) => URL.slice(URL.lastIndexOf("/") + 1));
}

exports.getPeople = async function () {
  const resp = await fetch("https://ghibliapi.herokuapp.com/people");
  let people = await resp.json();
  people = people.map((p) => ({
    id: p.id,
    name: p.name,
    films: extractFilmIds(p.films),
  }));
  return Object.fromEntries(people.map(p => [p.id, p]))
}

function extractFilmIds(filmsURLArray) {
  return filmsURLArray
    .map((URL) => URL.slice(URL.lastIndexOf("/") + 1));
}