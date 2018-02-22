class CartServiceMock {

  constructor() {
    this.cartHistory = [];
    this.responseMiliSec = Environments.get()['mock'].responseSec * 1000;
    this.currentId = 0;
  }

  addNewCart(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.currentId++;
        const newCart = { id:'0', status: 'preparing', productsInfo:[] };
        this.cartHistory.splice(0, 0, newCart);
        resolve(newCart);
      }, this.responseMiliSec);
    });
  }

  getCurrentCart(userId) {
    return new Promise((resolve, reject) => {
      if(this.cartHistory.length > 0) {
        setTimeout(() => resolve(this.cartHistory[0]), this.responseMiliSec);
      } else {
        this.addNewCart(userId)
          .then(resolve)
          .catch(reject);
      }
    });
  }

  getCartsHistory(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.cartHistory), this.responseMiliSec);
    });
  }

  getCartById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cart = this.cartHistory.find((currentCart) => currentCart.id === id);
        resolve(cart);
      }, this.responseMiliSec);
    });
  }

  saveCart(cart) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve(), this.responseMiliSec);//DO nothing since the cart is in memory and already saved
    });
  }

}