class HeaderModel {

  constructor() {

  }

  get user() { return App.instance.model.data.user; }
  get currentScreen() { return App.instance.model.data.currentScreen; }

}

class HeaderView {

  constructor(component) {
    this.component = component;
    this.id = 'header';
  }

  buildHTML() {
    const currentScreenTitleText = this.component.model.currentScreen + '_text';
    const rightButton = this.component.model.user ?
     `<button id='${this.id}_user_button' class='header_user_button right'>
       <span class="lsf symbol">user</span>
      </button>`
     :
     `<button id='${this.id}_login_button' class='header_user_button right'>
       <span class="lsf symbol">in</span>
      </button>`;

    return `<div id='${this.id}' class='${this.id}'>
              <button id='${this.id}_menu_button' class='left'>
               <span class="lsf symbol">menu</span>
              </button>
              <span class='screen_title'>[@${currentScreenTitleText}@]</span>
              ${rightButton}
            </div>`;
  }

  onDomUpdated() {
    if(this.component.model.user) {
      Html.registerClick(`${this.id}_user_button`, () => this.component.onUserButtonClicked());
    } else {
      Html.registerClick(`${this.id}_login_button`, () => this.component.onLoginButtonClicked());
    }
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
