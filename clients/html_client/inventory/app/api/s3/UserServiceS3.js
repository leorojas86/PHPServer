class UserServiceS3 {

  constructor() {
    this.loggedUser = null;
  }

  _checkForExistingUser(email) {
    return new Promise((resolve, reject) => {
      S3.instance.hasItem(`user_${email}`)
        .then((hasItem) => hasItem ? reject({ errorCode: 'user_already_exists' }) : resolve())
        .catch((reason) => reject(reason));
      });
  }

  getUser(email) {
    return S3.instance.getItem(`user_${email}`)
      .then((data) => JSON.parse(data.Body.toString()) )
  }

  register(email, password) {
      return this._checkForExistingUser(email)
        .then(() => {
            const data = JSON.stringify({ name: email, email: email, password: password, rootInventoryItemId:'0'});
            return S3.instance.addItem(`user_${email}`, data, 'application/json')
              .then(() => this.login(email, password));
        });
  }

  login(email, password) {
    return this.getUser(email)
      .then((user) => {
        if(user.password === password) { //TODO: Encript password
          this.loggedUser = user;
          return user;
        } else {
          throw { errorCode: 'invalid_credentials' };
        }
      });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.loggedUser = null;
      resolve();
    });
  }

}
