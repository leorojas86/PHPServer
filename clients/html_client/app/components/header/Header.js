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

  buildUI() {
    const user = this.component.model.data.user;
    return `<div class='header'>
              <button id='user_button_id' class='user_button'>${ user ? user.name : 'Login' }</button>
            </div>`;
  }

  registerEvents() {
    document.getElementById('user_button_id').onclick = () => {
      this.component.onUserButtonClicked();
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
}
