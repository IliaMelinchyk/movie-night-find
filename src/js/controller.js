import * as model from "./model.js";
import modalView from "./modalView.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const showMovie = async function (element) {
  try {
    const id = element.target.id;
    if (!id) return;
    modalView.renderSpinner();
    await model.loadModal(id);
    modalView.render(model.state.movie);
  } catch (error) {
    console.log(error);
    modalView.renderError();
  }
};
const init = () => {
  modalView.addHandlerRender(showMovie);
};
init();
