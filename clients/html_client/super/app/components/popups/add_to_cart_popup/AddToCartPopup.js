class AddToCartPopupModel {

  addToCart(quantity) {
    return ApiClient.instance.cartService.addToCurrentCart(AppData.instance.data.user.id, this.data.item, quantity)
      .then(() => {
        if(this.data.onItemAdded) {
          this.data.onItemAdded();
        }
      });
  }

}

class AddToCartPopupView {

  constructor(component) {
    this.id = 'add_to_cart_popup';
    this.component = component;
  }

  buildHTML() {
    return `<div id='${this.id}'>
              <table>
                <tr>
                  <th>[@description_text@]</th>
                  <th>${ this.component.model.data.item.description || this.component.model.data.item.name }</th>
                </tr>
                <tr>
                  <th>[@unit_text@]</th>
                  <th>${ this.component.model.data.item.unit }</th>
                </tr>
                <tr>
                  <th>[@price_per_unit_text@]</th>
                  <th>${ this.component.model.data.item.pricePerUnit }</th>
                </tr>
                <tr>
                  <th>[@quantity_text@]</th>
                  <th><input type='text' id='${this.id}_quantity_input_text' placeholder='' value='1'></th>
                </tr>
              </table>
              <button id='${this.id}_cancel_button'>
                <span class="lsf symbol">close</span> [@cancel_text@]
              </button>
              <button id='${this.id}_add_button'>
                <span class="lsf symbol">ok</span> [@add_text@]
              </button>
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_cancel_button`, () => this.component.popup.hide());
    Html.onClick(`${this.id}_add_button`, () => this.component.onAddButtonClick(Html.getValue(`${this.id}_quantity_input_text`)) );
  }

}

class AddToCartPopup {

  constructor() {
    this.model = new AddToCartPopupModel(this);
    this.view = new AddToCartPopupView(this);
    this.spinner = Html.addChild(new Spinner('add_to_cart_popup_spinner'), this);
  }

  onAddButtonClick(quantity) {
    this.spinner.show();
    this.model.addToCart(quantity)
      .then(() => this.popup.hide())
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => this.spinner.hide());
  }

}
