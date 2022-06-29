type Director = {
  id: string;
  name: string;
  films: Film[];
};

type Film = {
  id: string;
  title: string;
  director: Director;
};

let filmLazy: () => Film = () => {
  let film: Film = {
    id: "f1",
    title: "Alien",
    director: scott,
  };
  return film;
};

let scott: Director = {
  id: "d1",
  name: "R.Scott",
  films: [filmLazy()],
};

console.log(scott);
