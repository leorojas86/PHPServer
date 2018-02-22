class AddToCartPopupModel {

}

class AddToCartPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'add_to_cart_popup';
  }

  buildHTML() {
    const data = this.component.model.data;
    return  `<div id='${this.id}'>
                <span class="lsf symbol">search</span>
                <input type='text' id='${this.id}_search_input_text' placeholder='[@search_text@]' value=''>
             </div>`;
  }

  onDomUpdated() {
    Html.onKeyUp(`${this.id}_search_input_text`, (key) => {
      const inputValue = Html.getValue(`${this.id}_search_input_text`);
      Html.setDisabled(`${this.id}_ok_button`, !inputValue);

    });
    Html.setFocus(`${this.id}_search_input_text`);
  }

  submit() {
    const inputValue = Html.getValue(`${this.id}_search_input_text`);
    this.component.popup.hide();
  }

}

class AddToCartPopup {

  constructor() {
    this.model = new AddToCartPopupModel(this);
		this.view = new AddToCartPopupView(this);
  }

}
