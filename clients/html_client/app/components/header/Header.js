class HeaderModel {
  constructor(model) {
  }
}

class HeaderView {

  _getUserButton(data) {
    const buttonText = data.user ? 'data.user.name' : 'Login';
    return `<button class='user_button'>${ buttonText }</button>`;
  }

  build(data) {
    const userButtonHTML = this._getUserButton(data);
    return `<div class='header'>
              ${ userButtonHTML }
            </div>`;
  }
}

class Header {

  constructor() {
		this.model = new HeaderModel();
		this.view = new HeaderView();
	}
}
