import * as model from "./model.js";
import ModalView from "./modalView.js";
import SearchView from "./searchView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const showMovie = async function (element) {
  try {
    const id = element.target.id;
    if (!id) return;
    ModalView.renderSpinner();
    await model.loadModal(id);
    ModalView.render(model.state.movie);
  } catch (error) {
    console.error(error);
    ModalView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    const sort = SearchView.getSort();
    const genres = SearchView.getGenre();
    const vote = SearchView.getVote();
    // if (!vote || !genres) return;
    await model.loadSearchResults(sort, vote, genres);
  } catch (error) {
    console.error(error);
  }
};

const init = () => {
  ModalView.addHandlerRender(showMovie);
  SearchView.addHandlerSearch(controlSearchResults);
};
init();
