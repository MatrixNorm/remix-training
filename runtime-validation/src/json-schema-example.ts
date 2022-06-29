import Ajv from "ajv";
import filmSchema from "./json-schema/film.json";
import characterSchema from "./json-schema/character.json";

const ajv = new Ajv();

const validateFilm = ajv.compile(filmSchema);

const filmData = {
  id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  title: "Castle in the Sky",
  image: "https://image.org/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
  movie_banner: "https://image.org/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg",
  description: "The orphan Sheeta inherited a mysterious crystal.",
  release_date: 1986,
  characters: [
    "598f7048-74ff-41e0-92ef-87dc1ad980a9",
    "fe93adf2-2f3a-4ec4-9f68-5422f1b87c01",
  ],
};

validateFilm(filmData)
console.log(validateFilm);
