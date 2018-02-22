class AddToCartPopupModel {

  constructor() {
    this.items = [];
    this.searchText = '';
  }

  search(text) {
    this.searchText = text;
    return new Promise((resolve, reject) => {
      this.items = [];
      Html.startTimeout(resolve, 200);
    });
  }

}

class AddToCartPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'add_to_cart_popup';
    this.searchTimeout = null;
  }

  _getSearchResultsHTML() {
    if(this.component.model.searchText === '') {
      return `<p class='search_result'>[@enter_search_text@]</p>`;
    }
    if(this.component.model.items.length > 0) {
      return `<div>ITEMS HERE<div>`;
    }
    return `<p class='search_result'>[@nothing_to_show_text@]</p>`;
  }

  buildHTML() {
    return  `<div id='${this.id}'>
                <span class="lsf symbol">search</span>
                <input type='text' id='${this.id}_search_input_text' placeholder='[@search_text@]' value='${this.component.model.searchText}'>
                ${ this._getSearchResultsHTML() }
                ${ this.component.spinner.view.buildHTML() }
             </div>`;
  }

  onDomUpdated() {
    Html.onKeyUp(`${this.id}_search_input_text`, (key) => {
      this.searchTimeout = Html.startTimeout(() => this.component.searchForItems(Html.getValue(`${this.id}_search_input_text`)), 300, this.searchTimeout);
    });
    Html.setFocus(`${this.id}_search_input_text`);
  }


}

class AddToCartPopup {

  constructor() {
    this.model = new AddToCartPopupModel(this);
		this.view = new AddToCartPopupView(this);
    this.spinner = Html.addChild(new Spinner('add_to_cart_popup_spinner'), this);
  }

  searchForItems(searchText) {
    this.spinner.show();
    this.model.search(searchText)
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

}
