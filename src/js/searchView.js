class SearchView {
  _parentElement = document.querySelector(`.search`);
  _headerElement = document.querySelector(`.header`);
  _menuElement = document.querySelector(`.menu__btn`);
  _menuIsOn = false;
  getSort() {
    if (!this._parentElement.querySelector(".search__sort:checked"))
      return `&sort_by=vote_count.asc`;
    return `&sort_by=${
      this._parentElement.querySelector(".search__sort:checked").value
    }`;
  }
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
  getYearGte() {
    return `&primary_release_date.gte=${
      this._parentElement.querySelector(`.search__yearGte`).value
    }-01-01`;
  }
  getYearLte() {
    return `&primary_release_date.lte=${
      this._parentElement.querySelector(`.search__yearLte`).value
    }-12-31`;
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  addMenuClick() {
    this._menuElement.addEventListener(`click`, () => {
      this._menuElement.classList.toggle(`menu__open`);
      this._parentElement.classList.toggle(`search__open`);
      this._headerElement.classList.toggle(`header__open`);
      this._menuIsOn = !this._menuIsOn;
    });
  }
  addMenuResize() {
    window.addEventListener(`resize`, () => {
      if (
        document.documentElement.clientWidth > 1200 &&
        this._menuIsOn === true
      ) {
        this._menuElement.classList.remove(`menu__open`);
        this._parentElement.classList.remove(`search__open`);
        this._headerElement.classList.remove(`header__open`);
      }
    });
  }
  menuClose() {
    if (this._menuIsOn === true) {
      this._menuElement.classList.remove(`menu__open`);
      this._parentElement.classList.remove(`search__open`);
      this._headerElement.classList.remove(`header__open`);
      this._menuIsOn = !this._menuIsOn;
    }
  }
}
export default new SearchView();
