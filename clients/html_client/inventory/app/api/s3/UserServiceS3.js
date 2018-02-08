class UserServiceS3 {

  constructor() {
    this.loggedUser = null;
  }

  register(email, password) {
    const key = `user_${email}`;
    const data = JSON.stringify({ name: email, email: email, password: password, rootInventoryItemId:'0'});
    return S3.instance.addItem(key, data);
    /*return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = { name: email, email: email, password: password, rootInventoryItemId:'0' };
        this.users.push(newUser);
        resolve(newUser);
      }, this.responseMiliSec);
    });*/
  }

  login(email, password) {
    /*return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = this.users.find((user) => user.email === email && user.password === password);
        if(foundUser) {
          this.loggedUser = foundUser;
          resolve(foundUser);
        }
        else {
          reject({ errorCode: 'invalid_credentials' });
        }
      }, this.responseMiliSec);
    });*/
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
