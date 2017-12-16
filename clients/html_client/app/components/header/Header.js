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
            </div>`;
  }

  refreshUI() {
    Html.instance.updateElement('header', this.buildHTML());
    this.registerEvents();
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

}

class Header {

  constructor() {
		this.model = new HeaderModel();
		this.view = new HeaderView(this);
	}

  onUserButtonClicked() {
    alert('User Button Clicked');
  }

  onLoginButtonClicked() {
    alert('Login Button Clicked');
  }

}
