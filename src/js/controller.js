import * as model from "./model.js";
import ModalView from "./modalView.js";
import SearchView from "./searchView.js";
import ResultsView from "./resultsView.js";
import PaginationView from "./paginationView.js";
import BookmarksView from "./bookmarksView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
  module.hot.accept();
}
// Рендеринг модального окна с полученными данными от запроса
const controlMovie = async (element) => {
  try {
    const id = element.target.id;
    if (!id) return;
    // Появление модального окна
    ModalView.toggleHidden();
    // Рендеринг спиннера загрузки внутри
    ModalView.renderSpinner();
    // Загрузка фильма
    await model.loadModal(id);
    // Рендеринг фильма
    ModalView.render(model.state.movie);
    ModalView.toggleHidden();
  } catch (error) {
    console.error(error);
    // Рендеринг ошибки внутри модального окна
    ModalView.renderError(error);
  }
};
// Рендеринг результатов с полученными данными от запросов
const controlSearchResults = async (page = 1) => {
  try {
    // Рендеринг спиннера внутри окна результатов
    ResultsView.renderSpinner();
    // Получение поисковых запросов
    const sort = SearchView.getSort();
    const vote = SearchView.getVote();
    const genres = SearchView.getGenre();
    const yearGte = SearchView.getYearGte();
    const yearLte = SearchView.getYearLte();
    // Загрузка поискового результата
    await model.loadSearchResults(sort, page, vote, genres, yearGte, yearLte);
    // Рендеринг поискового результата
    await ResultsView.render(model.state.search.results);
    // Добавление открытия модального окна при нажатии на результат поиска
    ModalView.addHandlerRender(controlMovie);
    // Рендеринг переключения страниц
    PaginationView.render(model.state.search);
    // Закрытие меню поиска(на небольших экранах)
    SearchView.menuClose();
  } catch (error) {
    console.error(error);
    // Рендеринг ошибки в окне результатов
    ResultsView.renderError(error);
  }
};
const controlPagination = (goToPage) => {
  // Вызов нового поиска с номером выбранной страницы
  controlSearchResults(goToPage);
};
// Добавление и удаление Избранного
const controlAddBookmark = () => {
  if (!model.state.movie.bookmarked) model.addBookmark(model.state.movie);
  else model.deleteBookmark(model.state.movie.id);
  ModalView.render(model.state.movie);
  ModalView.toggleHidden();
  BookmarksView.render(model.state.bookmarks);
  ModalView.addHandlerRender(controlMovie);
};
// Рендеринг Избранного при загрузке страницы
const controlBookmarks = () => {
  BookmarksView.render(model.state.bookmarks);
  // Добавление события появления модального окна при клике на Избранное
  ModalView.addHandlerRender(controlMovie);
};
// Функции выполняемые при загрузке страницы
const init = () => {
  BookmarksView.addHandlerRender(controlBookmarks);
  ModalView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  SearchView.addMenuClick();
  SearchView.addMenuResize();
};
init();
