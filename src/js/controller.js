import * as model from "./model.js";
import ModalView from "./modalView.js";
import SearchView from "./searchView.js";
import ResultsView from "./resultsView.js";
import PaginationView from "./paginationView.js";
import BookmarksView from "./bookmarksView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import bookmarksView from "./bookmarksView.js";

// if (module.hot) {
//   module.hot.accept();
// }
const controlMovie = async function (element) {
  try {
    const id = element.target.id;
    if (!id) return;
    ModalView.renderSpinner();
    await model.loadModal(id);
    ModalView.render(model.state.movie);
    ModalView.toggleHidden();
    // bookmarksView.render(model.state.bookmarks);
  } catch (error) {
    console.error(error);
    ModalView.renderError(error);
  }
};
const controlSearchResults = async function (page = 1) {
  try {
    ResultsView.renderSpinner();
    const sort = SearchView.getSort();
    const vote = SearchView.getVote();
    const genres = SearchView.getGenre();
    const yearGte = SearchView.getYearGte();
    const yearLte = SearchView.getYearLte();
    await model.loadSearchResults(sort, page, vote, genres, yearGte, yearLte);
    await ResultsView.render(model.state.search.results);
    ModalView.addHandlerRender(controlMovie);
    PaginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};
const controlPagination = function (goToPage) {
  controlSearchResults(goToPage);
};
const controlAddBookmark = function () {
  if (!model.state.movie.bookmarked) model.addBookmark(model.state.movie);
  else model.deleteBookmark(model.state.movie.id);
  console.log(model.state.movie);
  ModalView.render(model.state.movie);
  ModalView.toggleHidden();
  BookmarksView.render(model.state.bookmarks);
  ModalView.addHandlerRender(controlMovie);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
  ModalView.addHandlerRender(controlMovie);
};
const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  // ModalView.addHandlerRender(controlMovie);
  ModalView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  SearchView.addClick();
  SearchView.addResize();
};
init();
