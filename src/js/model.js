import { async } from "regenerator-runtime";
import { API_URL, API_KEY, API_LANG, API_MIN_VOTES } from "./config.js";
import { getJSON } from "./helpers.js";
import * as genresJSON from "../json/genres.json";

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
// Loading modal with all the information about the movie
export const loadModal = async (id) => {
  try {
    const movie = await getJSON(
      `${API_URL}movie/${id}?api_key=${API_KEY}&language=${API_LANG}`
    );
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
      // Date conversion
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
      productionCountries: movie.production_countries.map((country) => {
        return country.name;
      }),
    };
    // Marking movie as Bookmarked if it is
    if (state.bookmarks.some((bookmark) => bookmark.id === +id)) {
      state.movie.bookmarked = true;
    } else {
      state.movie.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};
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
          // Searching for the genre names by the received ids in genres.json
          const genre = genresJSON.genres.find((object) => object.id === id);
          return genre.name;
        }),
        poster: movie.poster_path,
        overview: movie.overview,
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
// Saving Bookmarks in local storage
const persistBookmarks = () => {
  localStorage.setItem(`bookmarks`, JSON.stringify(state.bookmarks));
};
// Adding movie to Bookmarks (array and marking it as bookmarked)
export const addBookmark = (movie) => {
  state.bookmarks.push(movie);
  if (movie.id === state.movie.id) state.movie.bookmarked = true;
  persistBookmarks();
};
// Deleting movie from Bookmarks
// (finding it's index in array then deleting it and marking it as not bookmarked)
export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex((element) => element.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.movie.id) state.movie.bookmarked = false;
  persistBookmarks();
};
// Loading favorites from local storage on page load
const init = () => {
  const storage = localStorage.getItem(`bookmarks`);
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
