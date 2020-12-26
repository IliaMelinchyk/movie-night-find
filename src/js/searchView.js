class SearchView {
  _parentElement = document.querySelector(`.search`);
  getVote() {
    if (!this._parentElement.querySelector(".search__vote:checked")) return ``;
    return `&vote_average.gte=${
      this._parentElement.querySelector(".search__vote:checked").value
    }`;
  }
  getGenre() {
    let genres = [];
    this._parentElement
      .querySelectorAll(".search__genre:checked")
      .forEach((genre) => {
        genres.push(genre.value);
      });
    if (genres.length === 0) return ``;
    return `&with_genres=${genres.join(`,`)}`;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
