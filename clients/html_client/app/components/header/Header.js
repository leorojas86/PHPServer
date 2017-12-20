class HeaderModel {

  constructor() {
  }

  get user() {
    return App.instance.model.data.user;
  }

}

class HeaderView {

  constructor(component) {
    this.component = component;
    this.id = 'header';
  }

  buildHTML() {
    const user = this.component.model.user;
    return `<div id='${this.id}' class='${this.id}'>
              <button id='${this.id}_user_button' class='user_button'>
                <span class="lsf symbol">${ user ? '' : 'in' }user</span>
              </button>
              ${ this.component.loginPopup.view.buildHTML() }
              ${ this.component.userPopup.view.buildHTML() }
            </div>`;
  }

  registerEvents() {
    Html.registerClick(`${this.id}_user_button`, () => {
      if(this.component.model.user) {
        this.component.onUserButtonClicked();
      } else {
        this.component.onLoginButtonClicked();
      }
    });
  }

  refreshUI() {
    Html.updateElement(this.id, this);
  }

}

class Header {

  constructor() {
		this.model = new HeaderModel();
		this.view = new HeaderView(this);
    this.loginPopup = new LoginPopup();
    this.userPopup = new UserPopup();
	}

  onUserButtonClicked() {
    this.userPopup.show();
  }

  onLoginButtonClicked() {
    this.loginPopup.show();
  }

}
