import * as model from "./model.js";
import ModalView from "./modalView.js";
import SearchView from "./searchView.js";
import ResultsView from "./resultsView.js";
import PaginationView from "./paginationView.js";
import BookmarksView from "./bookmarksView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

// Rendering a modal window with data received from a request
const controlMovie = async (element) => {
  try {
    const id = element.target.id;
    if (!id) return;
    // Making modal visible
    ModalView.toggleHidden();
    // Rendering loading spinner inside modal
    ModalView.renderSpinner();
    // Loading movie
    await model.loadModal(id);
    // Rendering movie
    ModalView.render(model.state.movie);
    ModalView.toggleHidden();
  } catch (error) {
    // Rendering error inside modal
    ModalView.renderError(error);
  }
};
// Rendering results with data received from queries
const controlSearchResults = async (page = 1) => {
  try {
    // Rendering loading spinner inside results view
    ResultsView.renderSpinner();
    // Receiving search queries
    const sort = SearchView.getSort();
    const vote = SearchView.getVote();
    const genres = SearchView.getGenre();
    const yearGte = SearchView.getYearGte();
    const yearLte = SearchView.getYearLte();
    // Loading search result
    await model.loadSearchResults(sort, page, vote, genres, yearGte, yearLte);
    // Rendering search result
    await ResultsView.render(model.state.search.results);
    // Adding a modal window to open when clicking on a search result
    ModalView.addHandlerRender(controlMovie);
    // Rendering pagination
    PaginationView.render(model.state.search);
    // Close the search menu (on small screens)
    SearchView.menuClose();
  } catch (error) {
    // Rendering error in results view
    ResultsView.renderError(error);
  }
};
const controlPagination = (goToPage) => {
  // Invoking a new search with the selected page number
  controlSearchResults(goToPage);
};
// Adding and deleting a Bookmark
const controlAddBookmark = () => {
  if (!model.state.movie.bookmarked) model.addBookmark(model.state.movie);
  else model.deleteBookmark(model.state.movie.id);
  ModalView.render(model.state.movie);
  ModalView.toggleHidden();
  BookmarksView.render(model.state.bookmarks);
  ModalView.addHandlerRender(controlMovie);
};
// Rendering Bookmarks on page load
const controlBookmarks = () => {
  BookmarksView.render(model.state.bookmarks);
  // Adding an event to make modal visible when clicking on Bookmarks
  ModalView.addHandlerRender(controlMovie);
};
// Initialization functions
const init = () => {
  BookmarksView.addHandlerRender(controlBookmarks);
  ModalView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  SearchView.addMenuClick();
  SearchView.addMenuResize();
};
init();
