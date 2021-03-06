import View from "./View.js";
import icons from "../svg/sprite.svg";

class ResultsView extends View {
  _parentElement = document.querySelector(`.results__list`);
  _errorMessage = `No movies found for your search.`;
  _generateMarkup() {
    return this._data.map(this._generateMarkupResults).join(``);
  }
  _generateMarkupResults(result) {
    return `
    <li class="results__preview">
      <img src="https://image.tmdb.org/t/p/w200${result.poster}" alt="${
      result.title
    }" class="results__poster results__item" id="${result.id}"/>
      <div class="results__info">
        <h3 class="results__title">${result.title}</h3>
        ${
          result.genres.length > 0
            ? `
            <div class="results__flex-container">
              <p class="results__flex-left">Genre${
                result.genres.length > 1 ? `s` : ``
              }:</p>
              <ul class="results__genres">${result.genres
                .map((genre) => {
                  return `
                  <li class="results__genre">${genre}</li>
                  `;
                })
                .join(``)}
              </ul>
            </div>
            `
            : ``
        }
        <div class="results__flex-container">
          <p class="results__flex-left">Release date:</p>
          <p class="results__release">${result.release}</p>
        </div>
        <div class="results__flex-container">
          <p class="results__flex-left">User rating:</p>
          <p class="results__vote-average">
            <span>
              <svg>
                <use href="${icons}#icon-star${
      result.voteAverage <= 7.5 && result.voteAverage >= 5 ? `_half` : ``
    }${result.voteAverage < 5 ? `_outline` : ``}"></use>
              </svg>
            </span>
          ${result.voteAverage}/10</p>
        </div>
        <div class="results__flex-container">
          <p class="results__flex-left">Vote count:</p>
          <p class="results__vote-count">${result.voteCount}</p>
        </div>
        ${
          result.overview
            ? `          <p class="results__overview"><span>Overview:</span>${result.overview}</p>`
            : ``
        }
      </div>
    </li>
    `;
  }
}
export default new ResultsView();
