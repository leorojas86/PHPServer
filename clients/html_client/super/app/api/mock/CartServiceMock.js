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

  isInCurrentCart(userId, item) {
    return this.getCurrentCart(userId)
      .then((currentCart) => {
        return currentCart.productsInfo.find((productInfo) => productInfo.itemId === item.id) != null;
      });
  }

  addToCurrentCart(userId, item, quantity) {
    return this.getCurrentCart(userId)
      .then((cart) => {
        cart.productsInfo.push({ itemId:item.id, quantity:quantity, unit:item.unit, description:item.description || item.name, pricePerUnit: item.pricePerUnit});
        return this.saveCart(cart);
      });
  }

  clearCurrentCart(userId) {
    return this.getCurrentCart(userId)
      .then((currentCart) => {
        currentCart.productsInfo = [];
        return this.saveCart(currentCart);
      });
  }

}
