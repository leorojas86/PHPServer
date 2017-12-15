class HeaderModel {

  constructor(data) {
  }

}

class HeaderView {

  constructor(observer) {
    this.observer = observer;
  }

  buildUI(data) {
    return `<div class='header'>
              <button id='user_button_id' class='user_button'>${ data.user ? data.user.name : 'Login' }</button>
            </div>`;
  }

  registerEvents() {
    document.getElementById('user_button_id').onclick = () => {
      this.observer.onUserButtonClicked();
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
