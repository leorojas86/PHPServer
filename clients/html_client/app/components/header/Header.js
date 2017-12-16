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
  }

  buildHTML() {
    const user = this.component.model.user;
    return `<div id='header' class='header'>
              <button id='user_button' class='user_button'>
                <span class="lsf symbol">user</span> ${ user ? '' : '?' }
              </button>
              ${ this.component.loginPopup.view.buildHTML() }
            </div>`;
  }

  registerEvents() {
    document.getElementById('user_button').onclick = () => {
      if(this.component.model.user) {
        this.component.onUserButtonClicked();
      } else {
        this.component.onLoginButtonClicked();
      }
    };
  }

  refreshUI() {
    Html.instance.updateElement('header', this);
  }

}

class Header {

  constructor() {
		this.model = new HeaderModel();
		this.view = new HeaderView(this);
    this.loginPopup = new LoginPopup();
	}

  onUserButtonClicked() {
    alert('User Button Clicked');
  }

  onLoginButtonClicked() {
    this.loginPopup.show();
  }

}
