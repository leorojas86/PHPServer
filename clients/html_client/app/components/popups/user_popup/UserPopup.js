class UserPopupModel {

  constructor() {
    this.isShown = false;
  }

  get user() { return App.instance.model.data.user; }

}

class UserPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'user_popup';
  }

  buildHTML() {
    const user = this.component.model.user;
    return `<p>
              <span class="lsf symbol">user</span> ${user.name}
            </p>
            <button id='${this.id}_cart_button'>
              <span class="lsf symbol">cart</span> [@cart_text@]
            </button>
            <button id='${this.id}_notifications_button'>
              <span class="lsf symbol">globe</span> [@notifications_text@]
            </button>
            <button id='${this.id}_language_button'>
              <span class="lsf symbol">flag</span> [@language_text@]
            </button>
            <button id='${this.id}_settings_button'>
              <span class="lsf symbol">setting</span> [@settings_text@]
            </button>
            <button id='${this.id}_logout_button'>
             <span class="lsf symbol">out</span> [@logout_button_text@]
            </button>
            ${ this.component.spinner.view.buildHTML() }`;
  }

  onDomUpdated() {
    Html.registerClick(`${this.id}_logout_button`, () => this.component.onLogoutButtonClick());
    Html.registerClick(`${this.id}_settings_button`, () => this.component.onSettingButtonClicked());
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
        App.instance.onLoggedUserChanged(null);
      });
  }

  onSettingButtonClicked() {
    App.instance.messagePopup.show({ symbol:'setting', title:'Settings', message:"<p>Settings modal will show:</p><p>Language, Skin, ?</p>" });
  }

}
