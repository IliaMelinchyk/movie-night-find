import View from "./View.js";
import icons from "../svg/sprite.svg";
class BookmarksView extends View {
  _parentElement = document.querySelector(`.bookmarks__list`);
  _errorMessage = `Фильмов в Избранном не найдено`;
  _message = "";
  addHandlerRender(handler) {
    window.addEventListener(`load`, handler);
  }
  _generateMarkup() {
    return this._data.map(this._generateMarkupResults).join(``);
  }
  _generateMarkupResults(result) {
    return `
        <h3 class="results__title bookmark__item" id="${result.id}">${result.title}</h3>

    `;
  }
}
export default new BookmarksView();
