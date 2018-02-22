class AddToCartPopupModel {

  search(text) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

}

class AddToCartPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'add_to_cart_popup';
    this.searchTimeout = null;
  }

  buildHTML() {
    const searchResults = `<p class='enter_search_text'>[@enter_search_text@]</p>`;
    return  `<div id='${this.id}'>
                <span class="lsf symbol">search</span>
                <input type='text' id='${this.id}_search_input_text' placeholder='[@search_text@]' value=''>
                ${ searchResults }
                ${ this.component.spinner.view.buildHTML() }
             </div>`;
  }

  onDomUpdated() {
    Html.onKeyUp(`${this.id}_search_input_text`, (key) => {
      this.component.spinner.show();
      const searchText = Html.getValue(`${this.id}_search_input_text`);
      //Html.setDisabled(`${this.id}_ok_button`, !inputValue);
      this.searchTimeout = Html.startTimeout(() => {
        this.component.model.search(searchText)
          .finally(() => this.component.spinner.hide());
      }, 200, this.searchTimeout);
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

}
