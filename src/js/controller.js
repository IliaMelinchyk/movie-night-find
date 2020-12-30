import * as model from "./model.js";
import ModalView from "./modalView.js";
import SearchView from "./searchView.js";
import ResultsView from "./resultsView.js";
import PaginationView from "./paginationView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const showMovie = async function (element) {
  try {
    const id = element.target.id;
    if (!id) return;
    ModalView.renderSpinner();
    await model.loadModal(id);
    ModalView.render(model.state.movie);
    ModalView.toggleHidden();
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
    ResultsView.render(model.state.search.results);
    // ResultsView.render(model.getSearchResultsPage(1));
    ModalView.addHandlerRender(showMovie);
    PaginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage) {
  controlSearchResults(goToPage);
};
const init = () => {
  // ModalView.addHandlerRender(showMovie);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
};
init();
