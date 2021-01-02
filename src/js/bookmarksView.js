import View from "./View.js";
import icons from "../svg/sprite.svg";
class BookmarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `Нажмите на 
    <svg>
      <use href="${icons}#icon-favorite"></use>
    </svg>
    чтобы добавить фильм в Избранное`;
  _message = "";
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
