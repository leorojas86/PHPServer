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
    const loggedUserButtons = user ?  `<button id='${this.id}_options_button'>
                                         <span class="lsf symbol">menu</span>
                                       </button>
                                       <button id='${this.id}_notifications_button'>
                                         <span class="lsf symbol">globe</span>
                                       </button>` : '';

    return `<div id='${this.id}' class='${this.id}'>
              <div class='right_buttons_container'>
                ${loggedUserButtons}
                <button id='${this.id}_user_button' class='header_user_button'>
                  <span class="lsf symbol">${ user ? '' : 'in' }user</span>
                </button>
              </div>
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

}

class Header {

  constructor() {
		this.model = new HeaderModel();
		this.view = new HeaderView(this);
	}

  onUserButtonClicked() {
    App.instance.userPopup.show();
  }

  onLoginButtonClicked() {
    App.instance.loginPopup.show();
  }

}
