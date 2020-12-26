import icons from "../svg/sprite.svg";
class ModalView {
  _parentElement = document.querySelector(`.modal`);
  _overlayElement = document.querySelector(`.modal__overlay`);
  _searchResultElements = document.querySelectorAll(`.movies__item`);
  _data;
  _errorMessage = "Фильмов не найдено, попробуйте еще раз.";
  _message = "";
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
    this._parentElement.classList.remove(`hidden`);
    this._overlayElement.classList.remove(`hidden`);
    document.querySelectorAll(`.modal__close`).forEach((close) => {
      close.addEventListener(`click`, () => {
        this._parentElement.classList.add(`hidden`);
        this._overlayElement.classList.add(`hidden`);
      });
    });
  }
  _clear() {
    this._parentElement.innerHTML = ``;
  }
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-spinner2"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
  renderError(message = this._message) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-error"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    // ПЕРЕДАТЬ СЮДА КОНТЕЙНЕР КОТОРЫЙ БУДЕТ ОЧИЩЕН
    this._clear();
    // ПЕРЕДАТЬ СЮДА РОДИТЕЛЯ ГДЕ БУДЕТ РЕНДЕРИТСЯ ОШИБКА ВМЕСТО markup
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
  renderMessage(message = this._errorMessage) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-camera_roll"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    // ПЕРЕДАТЬ СЮДА КОНТЕЙНЕР КОТОРЫЙ БУДЕТ ОЧИЩЕН
    this._clear();
    // ПЕРЕДАТЬ СЮДА РОДИТЕЛЯ ГДЕ БУДЕТ РЕНДЕРИТСЯ СООБЩЕНИЕ ВМЕСТО markup
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }
  addHandlerRender(handler) {
    this._searchResultElements.forEach((item) => {
      item.addEventListener(`click`, (element) => handler(element));
    });
  }

  _generateMarkup() {
    return `
      <div class ="modal__header">
        <div>
          <h3 class="modal__title">${this._data.title}</h3>
          <h4 class="modal__tagline">${this._data.tagline}</h4>
        </div>
        <button class="modal__bookmark">
          <svg class="">
            <use href="${icons}#icon-favorite_outline"></use>
          </svg>
        </button>
      </div>
      <div class="modal__grid">
        <img
          src="https://image.tmdb.org/t/p/w500${this._data.poster}"
          alt="${this._data.title}"
          class="modal__poster"
        />
        <div class="modal__movie-info">
          <div class="modal__flex-container">
            <p class="modal__flex-left">Жанр${
              this._data.genres.length > 1 ? `ы` : ``
            }:</p>
            <ul class="modal__genres">
              ${this._data.genres
                .map((genre) => {
                  return `
                    <li class="modal__genre">${genre}</li>
                  `;
                })
                .join(``)}
            </ul>
          </div>
          ${
            this._data.budget > 0
              ? `<div class="modal__flex-container">
              <p class="modal__flex-left">Бюджет:</p>
              <p class="modal__budget">${this._data.budget}$</p>
              </div>`
              : ``
          }
          ${
            this._data.budget > 0
              ? `<div class="modal__flex-container">
              <p class="modal__flex-left">Сборы:</p>
              <p class="modal__revenue">${this._data.revenue}$</p>
              </div>`
              : ``
          }
          <div class="modal__flex-container">
            <p class="modal__flex-left">Дата выхода:</p>
            <p class="modal__release">${this._data.release}</p>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Длительность:</p>
            <p class="modal__runtime">${this._data.runtime} мин.</p>
          </div>
          <div class="modal__flex-container modal__flex-container-svg">
            <p class="modal__flex-left">Рейтинг зрителей:</p>
            <p class="modal__vote-average">
              <span>
                <svg>
                  <use href="${icons}#icon-star${
      this._data.voteAverage <= 7.5 && this._data.voteAverage >= 2.5
        ? `_half`
        : ``
    }${this._data.voteAverage < 2.5 ? `_outline` : ``}"></use>
                </svg>
              </span>
            ${this._data.voteAverage}/10</p>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Количество голосов:</p>
            <p class="modal__vote-count">${this._data.voteCount}</p>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Производство компани${
              this._data.productionCompanies.length > 1 ? `й` : `и`
            }:</p>
            <ul class="modal__production-companies">
            ${this._data.productionCompanies
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
              this._data.productionCountries.length > 1 ? `` : `ы`
            }:</p>
            <ul class="modal__production-countries">
            ${this._data.productionCountries
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
            <p class="modal__overview">${this._data.overview}</p>
          </div>
          <div class="modal__flex-container">
            <p class="modal__flex-left">Сайты:</p>
            <div class="modal__flex-links">
              <a href="${this._data.homepage}"
                target="_blank"
                rel="noopener noreferrer"
                class="modal__homepage">
                Официальный сайт фильма
              </a>
              <a href="https://www.imdb.com/title/${this._data.imdb}"
                target="_blank"
                rel="noopener noreferrer"
                class="modal__homepage">
                Страница на IMDB
              </a>
            </div>
          </div>
        </div>
        <img
          src="https://image.tmdb.org/t/p/w500${this._data.backdrop}"
          alt="${this._data.title}"
          class="modal__backdrop"
        />
      </div>
      <button class="modal__close-btn modal__close">
        <svg>
          <use href="${icons}#icon-disabled_by_default"></use>
        </svg>
      </button>
      
    `;
  }
}
export default new ModalView();
