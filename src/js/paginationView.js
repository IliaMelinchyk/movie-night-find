import View from "./View.js";
import icons from "../svg/sprite.svg";
class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);
  addHandlerClick(handler) {
    this._parentElement.addEventListener(`click`, function (event) {
      const btn = event.target.closest(`.pagination__btn`);
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Страница 1, есть другие страницы
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="pagination__btn pagination__btn-next">
        <svg class="pagination__right">
          <use href="${icons}#icon-circle-right"></use>
        </svg>
        <span>Стр. ${curPage + 1}</span>
      </button>
      `;
    }

    // Последняя страница
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="pagination__btn pagination__btn-prev">
        <svg class="pagination__left">
          <use href="${icons}#icon-circle-left"></use>
        </svg>
        <span>Стр. ${curPage - 1}</span>
      </button>
      `;
    }
    // Другая страница
    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="pagination__btn pagination__btn-prev">
        <svg class="pagination__left">
          <use href="${icons}#icon-circle-left"></use>
        </svg>
        <span>Стр. ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="pagination__btn pagination__btn-next">
        <svg class="pagination__right">
          <use href="${icons}#icon-circle-right"></use>
        </svg>
        <span>Стр. ${curPage + 1}</span>
      </button>
      `;
    }
    // Страница 1, нет других страниц
    return ``;
  }
}
export default new PaginationView();
