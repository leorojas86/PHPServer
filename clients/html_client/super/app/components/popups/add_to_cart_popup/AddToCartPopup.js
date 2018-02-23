class AddToCartPopupModel {

  constructor() {
    this.items = [];
    this.searchText = '';
  }

  search(text) {
    this.searchText = text;
    return ApiClient.instance.searchService.searchForItems(text)
      .then((items) => this.items = items);
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
      let items = '';
      this.component.model.items.forEach((item) => {
        items += `<button id='search_item_${item.itemId}' class='item'>${item.description}</button>`;
      });
      return `<div>
                ${items}
              <div>`;
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
      switch(key.code) {
        case 'Escape': this.component.popup.hide(); break;
        default:
          this.searchTimeout = Html.startTimeout(() => this.component.searchForItems(Html.getValue(`${this.id}_search_input_text`)), 300, this.searchTimeout);
        break;
      }
    });
    Html.setFocus(`${this.id}_search_input_text`);
    this.component.model.items.forEach((item) => {
      Html.onClick(`search_item_${item.itemId}`, () => this.component.onItemClicked(item));
    });
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

  onItemClicked(item) {
    this.spinner.show();
    ApiClient.instance.cartService.isInCurrentCart(AppData.instance.data.user.id, item)
      .then((isInCurrentCart) => {
        if(isInCurrentCart) {
          App.instance.messagePopup.show({ symbol:'surprise', title:'[@item_is_already_in_cart@]', message:'modify_item_quantity_if_needed' });
        } else {
          return ApiClient.instance.cartService.addToCurrentCart(AppData.instance.data.user.id, item, 1);
        }
      })
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(App.instance.cart);
      });
  }

}
