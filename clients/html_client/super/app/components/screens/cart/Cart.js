class CartModel {

}

class CartView {

  constructor() {
    this.id = 'cart';
  }

  buildHTML() {
    return `<div id='${this.id}'>
              Cart
            </div>`;
  }

}

class Cart {

  constructor() {
    this.model = new CartModel(this);
    this.view = new CartView(this);
  }

}
