export const getFilms = async () => {
  const resp = await fetch("https://ghibliapi.herokuapp.com/films");
  //console.log(]f
  return await resp.json();
};