class SearchItemsPopupModel {

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

class SearchItemsPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'search_items_popup';
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
      return items;
    }
    return `<p class='search_result'>[@nothing_to_show_text@]</p>`;
  }

  buildHTML() {
    return  `<div id='${this.id}' align='center'>
                <div id='${this.id}_search_text' class='text_input_field'>
                  <span class="lsf symbol">search</span>
                  <input type='text' id='${this.id}_search_input_text' placeholder='[@search_text@]' value='${this.component.model.searchText}'>
                </div>
                <div class='search_results'>
                  ${ this._getSearchResultsHTML() }
                </div>
                <button id='${this.id}_cancel_button'>
                  <span class="lsf symbol">close</span> [@cancel_text@]
                </button>
                ${ this.component.spinner.view.buildHTML() }
             </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_cancel_button`, () => this.component.popup.hide());
    Html.onClick(`${this.id}_search_text`, () => Html.setFocus(`${this.id}_search_input_text`));
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

class SearchItemsPopup {

  constructor() {
    this.model = new SearchItemsPopupModel(this);
		this.view = new SearchItemsPopupView(this);
    this.spinner = Html.addChild(new Spinner('search_items_popup_spinner'), this);
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
    return ApiClient.instance.inventoryService.getItemById(item.itemId)
      .then((inventoryItem) => {
        return ApiClient.instance.cartService.isInCurrentCart(AppData.instance.data.user.id, inventoryItem)
          .then((isInCart) => {
            if(isInCart) {
              App.instance.messagePopup.show({ symbol:'surprise', title:'[@item_is_already_in_cart@]', message:'[@modify_item_quantity_if_needed@]' });
            } else {
              App.instance.addToCartPopup.show({ item:inventoryItem, onItemAdded:this.model.data.onItemAdded });
            }
          });
      })
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(App.instance.cart);
      });
  }

}
