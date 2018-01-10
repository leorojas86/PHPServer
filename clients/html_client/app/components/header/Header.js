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
    const rightButtons = this.component.model.user ?
     `<button id='${this.id}_user_button' class='header_user_button'>
       <span class="lsf symbol">user</span>
      </button>`
     :
     `<button id='${this.id}_login_button' class='header_user_button'>
       <span class="lsf symbol">in</span>
      </button>`;

    return `<div id='${this.id}' class='${this.id}'>
              <div class='left_buttons_container'>
                <button id='${this.id}_menu_button'>
                 <span class="lsf symbol">menu</span>
                </button>
              </div>
              <div class='right_buttons_container'>
                ${rightButtons}
              </div>
            </div>`;
  }

  registerEvents() {
    Html.registerClick(`${this.id}_user_button`, () => this.component.onUserButtonClicked());
    Html.registerClick(`${this.id}_login_button`, () => this.component.onLoginButtonClicked());
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
