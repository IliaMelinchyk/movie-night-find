const { async } = require("regenerator-runtime");
// NPM пакет для перевода iso 3166-1 названий стран на русский
import * as countries from "i18n-iso-countries";
import * as ru from "i18n-iso-countries/langs/ru.json";

export const state = {
  movie: {},
};
export const loadModal = async function (id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b3b5c5cdc290871a981f5411f85b916d&language=ru-RU`
    );
    let movie = await res.json();
    if (!res.ok) throw new Error(`Ошибка (${res.status})`);
    console.log(res, movie);
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
      productionCountries: movie.production_countries.map((country) => {
        return countries.getName(country.iso_3166_1, "ru", {
          select: "official",
        });
      }),
    };
    console.log(state.movie);
  } catch (error) {
    alert(error);
  }
};
