const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

import * as model from "./model.js";

import icons from "../svg/sprite.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";
const modalContainer = document.querySelector(`.modal`);
const modalOverlay = document.querySelector(`.modal__overlay`);

const renderSpinner = function (parent) {
  const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-spinner2"></use>
    </svg>
  </div>
  `;
  parent.innerHTML = ``;
  parent.insertAdjacentHTML(`afterbegin`, markup);
};

const showMovie = async function (element) {
  try {
    const id = element.target.id;
    // const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    renderSpinner(modalContainer);
    await model.loadModal(id);
    const movie = model.state.movie;
    const markup = `
      <div class ="modal__header">
        <div>
          <h3 class="modal__title">${movie.title}</h3>
          <h4 class="modal__tagline">${movie.tagline}</h4>
        </div>
        <button class="modal__bookmark">
          <svg class="">
            <use href="${icons}#icon-favorite_outline"></use>
          </svg>
        </button>
      </div>
      <div class="modal__grid">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster}"
          alt="${movie.title}"
          class="modal__poster"
        />
        <div class="modal__movie-info">
          <div class="modal__flex-container">
            <p class="modal__flex-left">Жанр${
              movie.genres.length > 1 ? `ы` : ``
            }:</p>
            <ul class="modal__genres">
              ${movie.genres
                .map((genre) => {
                  return `
                    <li class="modal__genre">${genre}</li>
                  `;
                })
                .join(``)}
            </ul>
          </div>
          ${
            movie.budget > 0
              ? `<div class="modal__flex-container">
              <p class="modal__flex-left">Бюджет:</p>
              <p class="modal__budget">${movie.budget}$</p>
              </div>`
              : ``
          }
          ${
            movie.budget > 0
              ? `<div class="modal__flex-container">
              <p class="modal__flex-left">Сборы:</p>
              <p class="modal__revenue">${movie.revenue}$</p>
              </div>`
              : ``
          }
          <div class="modal__flex-container">
            <p class="modal__flex-left">Дата выхода:</p>
            <p class="modal__release">${movie.release}</p>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Длительность:</p>
            <p class="modal__runtime">${movie.runtime} мин.</p>
          </div>
          <div class="modal__flex-container modal__flex-container-svg">
            <p class="modal__flex-left">Рейтинг зрителей:</p>
            <p class="modal__vote-average">
              <span>
                <svg>
                  <use href="${icons}#icon-star${
      movie.voteAverage <= 7.5 && movie.voteAverage >= 2.5 ? `_half` : ``
    }${movie.voteAverage < 2.5 ? `_outline` : ``}"></use>
                </svg>
              </span>
            ${movie.voteAverage}/10</p>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Количество голосов:</p>
            <p class="modal__vote-count">${movie.voteCount}</p>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Производство компани${
              movie.productionCompanies.length > 1 ? `й` : `и`
            }:</p>
            <ul class="modal__production-companies">
            ${movie.productionCompanies
              .map((company) => {
                return `
              <li class="modal__production-company">${company}</li>
              `;
              })
              .join(``)}
            </ul>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Производство стран${
              movie.productionCountries.length > 1 ? `` : `ы`
            }:</p>
            <ul class="modal__production-countries">
            ${movie.productionCountries
              .map((country) => {
                return `
              <li class="modal__production-country">${country}</li>
              `;
              })
              .join(``)}
            </ul>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Описание:</p>
            <p class="modal__overview">${movie.overview}</p>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Сайты:</p>
            <div class="modal__flex-links">
              <a href="${movie.homepage}"
                target="_blank"
                rel="noopener noreferrer"
                class="modal__homepage">
                Официальный сайт фильма
              </a>
              <a href="https://www.imdb.com/title/${movie.imdb}"
                target="_blank"
                rel="noopener noreferrer"
                class="modal__homepage">
                Страница на IMDB
              </a>
            </div>
          </div>
        </div>
        <img
          src="https://image.tmdb.org/t/p/w500${movie.backdrop}"
          alt="${movie.title}"
          class="modal__backdrop"
        />
      </div>
      <button class="modal__close-btn modal__close">
        <svg>
          <use href="${icons}#icon-disabled_by_default"></use>
        </svg>
      </button>
      
    `;
    modalContainer.innerHTML = ``;
    modalContainer.insertAdjacentHTML(`afterbegin`, markup);
    modalContainer.classList.remove(`hidden`);
    modalOverlay.classList.remove(`hidden`);
    document.querySelectorAll(`.modal__close`).forEach((close) => {
      close.addEventListener(`click`, () => {
        modalContainer.innerHTML = ``;
        modalContainer.classList.add(`hidden`);
        modalOverlay.classList.add(`hidden`);
      });
    });
  } catch (error) {
    alert(error);
  }
};
// showMovie();
const moviesItem = document.querySelectorAll(`.movies__item`);
moviesItem.forEach((item) => {
  item.addEventListener(`click`, (element) => showMovie(element));
});
const init = () => {};
init();
