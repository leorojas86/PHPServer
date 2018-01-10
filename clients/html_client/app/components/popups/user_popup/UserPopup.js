class UserPopupModel {

  constructor() {
    this.isShown = false;
  }

  get user() {
    return App.instance.model.data.user;
  }

}

class UserPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'user_popup';
  }

  buildHTML() {
    const user = this.component.model.user;
    return `<p class='margin_class'>
              <span class="lsf symbol">user</span> ${user.name}
            </p>
            <button id='${this.id}_notifications_button'>
              <span class="lsf symbol">globe</span> Notifications
            </button>
            <button id='${this.id}_logout_button' class='margin_class'>
             <span class="lsf symbol">out</span> [@logout_button_text@]
            </button>
            ${ this.component.spinner.view.buildHTML() }`;
  }

  registerEvents() {
    Html.registerClick(`${this.id}_logout_button`, () => this.component.onLogoutButtonClick());
  }

}

class UserPopup {

  constructor() {
		this.model = new UserPopupModel();
		this.view = new UserPopupView(this);
    this.spinner = new Spinner('user_popup_spinner');
	}

  onLogoutButtonClick() {
    this.spinner.show();
    ApiClient.instance.userService.logout()
      .finally(() => {
        this.spinner.hide();
        this.popup.hide();
        App.instance.updateLoggedUser(null);
      });
  }

}
