class CartOptionsPopupModel {

}

class CartOptionsPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'cart_options_popup';
  }

  buildHTML() {
    return `<div id='${this.id}'>
              <button id='${this.id}_cart_history_button'>
                <span class="lsf symbol">book</span> [@history_text@]
              </button>
              <button id='${this.id}_clear_cart_button'>
                <span class="lsf symbol">delete</span> [@clear_text@]
              </button>
            </div>`;
  }

  onDomUpdated() {
    Html.setVisible(`${this.id}_clear_cart_button`, this.component.model.data.cart.status === 'preparing');
    Html.onClick(`${this.id}_cart_history_button`, () => this.component.onHistoryButtonClicked());
    Html.onClick(`${this.id}_clear_cart_button`, () => this.component.onClearCartButtonClicked());
  }

}

class CartOptionsPopup {

  constructor() {
		this.model = new CartOptionsPopupModel(this);
		this.view = new CartOptionsPopupView(this);
	}

  onHistoryButtonClicked() {
    this.popup.hide();
  }

  onClearCartButtonClicked() {
    this.popup.hide();
  }

}
