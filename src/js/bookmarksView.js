import View from "./View.js";
import icons from "../svg/sprite.svg";

class BookmarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `Press 
    <svg>
      <use href="${icons}#icon-favorite"></use>
    </svg>
    to add a movie to Bookmarks`;
  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupResults).join(``);
  }
  _generateMarkupResults(result) {
    return `
    <li>
      <button class="results__item bookmarks__btn bookmarks__item" id="${result.id}">
      ${result.title}
      </button>
    </li>
    `;
  }
}
export default new BookmarksView();
