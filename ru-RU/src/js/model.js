import { async } from "regenerator-runtime";
// NPM пакет для перевода iso 3166-1 названий стран на русский
import * as countries from "i18n-iso-countries";
import * as ru from "i18n-iso-countries/langs/ru.json";

import { API_URL, API_KEY, API_LANG, API_MIN_VOTES } from "./config.js";
import { getJSON } from "./helpers.js";
import * as genresJSON from "../json/genres.json";

// Хранилище данных о фильмах
export const state = {
  movie: {},
  search: {
    sort: ``,
    vote: ``,
    genre: ``,
    yearGte: ``,
    yearLte: ``,
    results: [],
    pages: ``,
    page: 1,
  },
  bookmarks: [],
};
// Загрузка модального окна с фильмом
export const loadModal = async (id) => {
  try {
    const movie = await getJSON(
      `${API_URL}movie/${id}?api_key=${API_KEY}&language=${API_LANG}`
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
      release: new Intl.DateTimeFormat(`${API_LANG}`, {
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
        return countries.getName(country.iso_3166_1, `ru`, {
          select: `official`,
        });
      }),
    };
    // Отметка фильма как Избранного из хранилища
    if (state.bookmarks.some((bookmark) => bookmark.id === +id)) {
      state.movie.bookmarked = true;
    } else {
      state.movie.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};
// Загрузка результатов поиска
export const loadSearchResults = async (
  sort,
  page,
  vote,
  genre,
  yearGte,
  yearLte
) => {
  try {
    state.search.sort = sort;
    state.search.page = page;
    state.search.vote = vote;
    state.search.genre = genre;
    state.search.yearGte = yearGte;
    state.search.yearLte = yearLte;
    const movies = await getJSON(
      `${API_URL}discover/movie?api_key=${API_KEY}&language=${API_LANG}${sort}&include_adult=false&include_video=false&page=1&vote_count.gte=${API_MIN_VOTES}&page=${page}${vote}${genre}${yearGte}${yearLte}`
    );
    state.search.pages = movies.total_pages;
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
        release: new Intl.DateTimeFormat(`${API_LANG}`, {
          day: `numeric`,
          month: `long`,
          year: `numeric`,
        }).format(new Date(movie.release_date)),
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      };
    });
  } catch (error) {
    throw error;
  }
};
// Сохранение Избранного в локальном хранилище
const persistBookmarks = () => {
  localStorage.setItem(`bookmarks`, JSON.stringify(state.bookmarks));
};
// Добавление фильма в избранное (массив и буллиновая отметка)
export const addBookmark = (movie) => {
  state.bookmarks.push(movie);
  if (movie.id === state.movie.id) state.movie.bookmarked = true;
  persistBookmarks();
};
// Удаление из избранного (нахождение в массиве по номеру и буллиновая отметка)
export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex((element) => element.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.movie.id) state.movie.bookmarked = false;
  persistBookmarks();
};
// Загрузка избранного из локального хранилище при загрузке страницы
const init = () => {
  const storage = localStorage.getItem(`bookmarks`);
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
