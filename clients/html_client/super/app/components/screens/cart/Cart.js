class CartModel {

  constructor() {
    this.currentCartInfo = null;
  }

  get cartItems() {
    return this.currentCartInfo  ? this.currentCartInfo.productsInfo : [];
  }

  get total() {
    let total = 0;
    this.cartItems.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.pricePerUnit;
    });
    return total;
  }

  get status() {
    return this.currentCartInfo ? this.currentCartInfo.status : 'loading';
  }

  loadCurrentCart() {
    return ApiClient.instance.cartService.getCurrentCart(AppData.instance.data.user.id)
      .then((cartInfo) => this.currentCartInfo = cartInfo);
  }

}

class CartView {

  constructor(component) {
    this.component = component;
    this.id = 'cart';
  }

  buildHTML() {
    const cartItems = this.component.model.cartItems;
    let cartItemsRows = '';
    this.component.model.cartItems.forEach((cartItem) => {
      cartItemsRows += `<tr tabindex='0' class='cart_table_item'>
                          <th>${cartItem.quantity}</th><th>${cartItem.description} (${cartItem.unit})</th><th>${cartItem.pricePerUnit}</th><th>${cartItem.quantity * cartItem.pricePerUnit}</th>
                        </tr>`;
    });
    return `<div id='${this.id}' class='${this.id}'>
              <div class='cart_header'>
                <span class='status_text'>[@status_text@]: [@${this.component.model.status}_text@]</span>
                <button id='${this.id}_options_button' class='right'>
                  <span class="lsf symbol">menu</span> [@options_text@]
                </button>
              </div>
              <table>
                <tr class='cart_table_header'>
                  <th>[@quantity_text@]</th><th>[@description_text@]</th><th>[@p_u_text@]</th><th>[@price_text@]</th>
                </tr>
                ${cartItemsRows}
                <tr class='cart_table_footer'>
                  <th style='background-color:transparent;'></th><th style='background-color:transparent;'></th><th>[@total_text@]</th><th>${this.component.model.total}</th>
                </tr>
              </table>
              <div>
                <button id='${this.id}_add_button'>
                  <span class="lsf symbol">add</span> [@add_text@]
                </button>
                <button id='${this.id}_order_button' class='right'>
                  <span class="lsf symbol">check</span> [@order_text@]
                </button>
              </div>
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    if(this.component.model.currentCartInfo) {
      Html.setVisible(`${this.id}_add_button`, this.component.model.status === 'preparing');
      Html.setVisible(`${this.id}_order_button`, this.component.model.status === 'preparing');
      Html.onClick(`${this.id}_add_button`,() => this.component.onAddButtonClicked());
      Html.onClick(`${this.id}_order_button`,() => this.component.onOrderButtonClicked());
      Html.onClick(`${this.id}_options_button`,() => this.component.onOptionsButtonClicked());
    } else {
      this.component.loadCart();
    }
  }

}

class Cart {

  constructor() {
    this.model = new CartModel(this);
    this.view = new CartView(this);
    this.spinner = Html.addChild(new Spinner('cart_spinner'), this);
  }

  loadCart() {
    this.spinner.show();
    this.model.loadCurrentCart()
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

  onAddButtonClicked() {
    App.instance.searchItemsPopup.show({ onItemAdded: () => this.loadCart() });
  }

  onOrderButtonClicked() {

  }

  onOptionsButtonClicked() {
    App.instance.cartOptionsPopup.show({ cart: this.model.currentCartInfo });
  }

  empty() {
    this.spinner.show();
    ApiClient.instance.cartService.clearCurrentCart(AppData.instance.data.user.id)
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

}
