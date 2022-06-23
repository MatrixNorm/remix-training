export const getFilms = async (title) => {
  //XXX spec
  const resp = await fetch("https://ghibliapi.herokuapp.com/films");
  const films = await resp.json();
  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
};

export const getFilm = async (filmId) => {
  const resp = await fetch(`https://ghibliapi.herokuapp.com/films/${filmId}`);
  return await resp.json();
};
