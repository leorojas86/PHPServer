class UserServiceS3 {

  constructor() {
    this.loggedUser = null;
  }

  register(email, password) {
    const data = JSON.stringify({ name: email, email: email, password: password, rootInventoryItemId:'0'});
    return S3.instance.addItem(`user_${email}`, data, 'application/json')
      .then(() => {
        return this.login(email, password);
      });
  }

  login(email, password) {
    return S3.instance.getItem(`user_${email}`)
      .then((data) => {
        this.loggedUser = data.Body.toString();
        return this.loggedUser;
      });
  }

  logout() {
    /*return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loggedUser = null;
        resolve();
      }, this.responseMiliSec);
    });*/
  }

}
