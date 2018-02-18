class CartModel {

}

class CartView {

  constructor() {
    this.id = 'cart';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              <table>
              <tr>
                <th>[@quantity_text@]</th><th>[@description_text@]</th><th>[@p_u_text@]</th><th>[@total_text@]</th>
              </tr>
              <tr>
                <th>1k</th><th>Posta Res</th><th>3000</th><th>3000</th>
              </tr>
              </table>
            </div>`;
  }

}

class Cart {

  constructor() {
    this.model = new CartModel(this);
    this.view = new CartView(this);
  }

}
