class CartModel {

  get cartItems() {
    return [{
      quantity: '2k',
      description: 'Posta de Res',
      pricePerUnit: 3000,
      price: 6000
    }];
  }

  get total() {
    let total = 0;
    this.cartItems.forEach((cartItem) => total += cartItem.price);
    return total;
  }

}

class CartView {

  constructor(component) {
    this.component = component;
    this.id = 'cart';
  }

  buildHTML() {
    const cartItems = this.component.model.cartItems;
    if(cartItems.length > 0) {
      let cartItemsRows = '';
      cartItems.forEach((cartItem) => {
        cartItemsRows += `<tr>
                            <th>${cartItem.quantity}</th><th>${cartItem.description}</th><th>${cartItem.pricePerUnit}</th><th>${cartItem.price}</th>
                          </tr>`;
      });
      return `<div id='${this.id}' class='${this.id}'>
                <table>
                <tr>
                  <th>[@quantity_text@]</th><th>[@description_text@]</th><th>[@p_u_text@]</th><th>[@price_text@]</th>
                </tr>
                ${cartItemsRows}
                <tr>
                  <th></th><th></th><th></th><th></th>
                </tr>
                <tr>
                  <th></th><th></th><th>[@total_text@]</th><th>${this.component.model.total}</th>
                </tr>
                </table>
              </div>`;
    }
    return `<div id='${this.id}' class='${this.id}'>
              <p>[@cart_is_empty_text@]<p>
            </div>`;
  }

}

class Cart {

  constructor() {
    this.model = new CartModel(this);
    this.view = new CartView(this);
  }

}
