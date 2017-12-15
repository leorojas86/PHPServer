class HeaderModel {

  constructor() {
  }

  get data() {
    return App.instance.model.data;
  }
}

class HeaderView {

  constructor(component) {
    this.component = component;
  }

  buildHTML() {
    const user = this.component.model.data.user;
    return `<div id='header' class='header'>
              <button id='user_button' class='user_button'>${ user ? user.name : 'Login' }</button>
            </div>`;
  }

  refreshUI() {
    document.getElementById('header').outerHTML = this.buildHTML();
    this.registerEvents();
  }

  registerEvents() {
    document.getElementById('user_button').onclick = () => {
      if(this.component.model.data.user) {
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
