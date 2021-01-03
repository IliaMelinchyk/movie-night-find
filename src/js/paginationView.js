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
    const numPages = this._data.pages;
    // Страница 1, есть другие страницы
    if (curPage === 1 && numPages > 1) {
      return `
      <p class="pagination__num">Всего ${numPages} стр.</p>
      <button data-goto="${
        curPage + 1
      }" class="pagination__btn pagination__btn-next">
        <span>Стр. ${curPage + 1}</span>
        <svg>
          <use href="${icons}#icon-circle-right"></use>
        </svg>
      </button>
      `;
    }

    // Последняя страница
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="pagination__btn pagination__btn-prev">
        <svg>
          <use href="${icons}#icon-circle-left"></use>
        </svg>
        <span>Стр. ${curPage - 1}</span>
      </button>
      <p class="pagination__num">Всего ${numPages} стр.</p>
      `;
    }
    // Другая страница
    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="pagination__btn pagination__btn-prev">
        <svg>
          <use href="${icons}#icon-circle-left"></use>
        </svg>
        <span>Стр. ${curPage - 1}</span>
      </button>
      <p class="pagination__num">Всего ${numPages} стр.</p>
      <button data-goto="${
        curPage + 1
      }" class="pagination__btn pagination__btn-next">
        <span>Стр. ${curPage + 1}</span> 
        <svg>
          <use href="${icons}#icon-circle-right"></use>
        </svg>
      </button>
      `;
    }
    // Страница 1, нет других страниц
    return ``;
  }
}
export default new PaginationView();
