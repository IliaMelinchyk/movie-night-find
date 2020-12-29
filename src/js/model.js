import { async } from "regenerator-runtime";
// NPM пакет для перевода iso 3166-1 названий стран на русский
import * as countries from "i18n-iso-countries";
import * as ru from "i18n-iso-countries/langs/ru.json";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
import * as genresJSON from "../json/genres.json";

export const state = {
  movie: {},
  search: {
    sort: ``,
    vote: ``,
    genre: ``,
    results: [],
    yearGte: ``,
    yearLte: ``,
  },
};
export const loadModal = async function (id) {
  try {
    const movie = await getJSON(
      `${API_URL}movie/${id}?api_key=b3b5c5cdc290871a981f5411f85b916d&language=ru-RU`
    );
    // Активация русского языка как основного для конвертации стран
    countries.registerLocale(ru);
    state.movie = {
      id: movie.id,
      title: movie.title,
      tagline: movie.tagline,
      genres: movie.genres.map((genre) => {
        return genre.name;
      }),
      backdrop: movie.backdrop_path,
      poster: movie.poster_path,
      homepage: movie.homepage,
      imdb: movie.imdb_id,
      overview: movie.overview,
      budget: movie.budget,
      revenue: movie.revenue,
      // Конвертация даты в русский текст
      release: new Intl.DateTimeFormat(`ru-RU`, {
        day: `numeric`,
        month: `long`,
        year: `numeric`,
      }).format(new Date(movie.release_date)),
      runtime: movie.runtime,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      productionCompanies: movie.production_companies.map((company) => {
        return company.name;
      }),
      // Конвертация сокращенного названия страны на английском в полное на русском
      productionCountries: movie.production_countries.map((country) => {
        return countries.getName(country.iso_3166_1, "ru", {
          select: "official",
        });
      }),
    };
    console.log(state.movie);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const loadSearchResults = async function (
  sort,
  vote,
  genre,
  yearGte,
  yearLte
) {
  try {
    state.search.sort = sort;
    state.search.genre = genre;
    state.search.vote = vote;
    state.search.yearGte = yearGte;
    state.search.yearLte = yearLte;
    console.log(genre, vote);
    const movies = await getJSON(
      `${API_URL}discover/movie?api_key=b3b5c5cdc290871a981f5411f85b916d&language=ru-RU${sort}&include_adult=false&include_video=false&page=1&vote_count.gte=300${vote}${genre}${yearGte}${yearLte}`
    );
    console.log(movies);
    state.search.results = movies.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        genres: movie.genre_ids.map((id) => {
          // Поиск названия жанра по полученному id в genres.json
          const genre = genresJSON.genres.find((object) => object.id === id);
          return genre.name;
        }),
        poster: movie.poster_path,
        overview: movie.overview,
        // Конвертация даты в русский текст
        release: new Intl.DateTimeFormat(`ru-RU`, {
          day: `numeric`,
          month: `long`,
          year: `numeric`,
        }).format(new Date(movie.release_date)),
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      };
    });
    console.log(state.search.results);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
