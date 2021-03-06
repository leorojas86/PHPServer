
class AppModel {

	constructor(component) {
		this.component = component;
	}

	updateLoggedUser(user) {
		AppData.instance.setUser(user);
		AppData.instance.setCurrentScreen(user ? 'inventory' : 'welcome');
	}

	get currentScreen() {
		switch (AppData.instance.getCurrentScreen()) {
			case 'welcome': return this.component.welcome; break;
			case 'inventory': return this.component.inventory; break;
			case 'registration': return this.component.registration; break;
			case 'cart': return this.component.cart; break;
		}
 		return null;
	}

}

class AppView {

	constructor(component) {
		this.component = component;
		this.id = 'app';
	}

	buildHTML() {
		return `<div id='${this.id}' class='${this.id}'>
					${ this.component.header.view.buildHTML() }
					${ this.component.model.currentScreen.view.buildHTML() }
					${ this.component.contextMenu.view.buildHTML() }
					${ this.component.menuPopup.view.buildHTML() }
					${ this.component.loginPopup.view.buildHTML() }
					${ this.component.userPopup.view.buildHTML() }
					${ this.component.settingsPopup.view.buildHTML() }
					${ this.component.cartOptionsPopup.view.buildHTML() }
					${ this.component.searchItemsPopup.view.buildHTML() }
					${ this.component.addToCartPopup.view.buildHTML() }
					${ this.component.messagePopup.view.buildHTML() }
					${ this.component.textPromptPopup.view.buildHTML() }
					${ this.component.confirmationPopup.view.buildHTML() }
				</div>`;
	}

}

class App
{

	static get instance() {
		if (App._instance) {
			return App._instance;
		}
		return App._instance = new App();
	}

	constructor() {
		this.model = new AppModel(this);
		this.view = new AppView(this);
		this.header = Html.addChild(new Header(), this);
		this.welcome = Html.addChild(new Welcome(), this);
		this.registration = Html.addChild(new Registration(), this);
		this.inventory = Html.addChild(new Inventory(), this);
		this.cart = Html.addChild(new Cart(), this);
		this.contextMenu = Html.addChild(new DropdownMenu('context_menu'), this);
		this.menuPopup = Html.addChild(new Popup(new MenuPopup()), this);
		this.loginPopup = Html.addChild(new Popup(new LoginPopup()), this);
    	this.userPopup = Html.addChild(new Popup(new UserPopup()), this);
		this.messagePopup = Html.addChild(new Popup(new MessagePopup()), this);
		this.textPromptPopup = Html.addChild(new Popup(new TextPromptPopup()), this);
		this.settingsPopup = Html.addChild(new Popup(new SettingsPopup()), this);
		this.confirmationPopup = Html.addChild(new Popup(new ConfirmationPopup()), this);
		this.cartOptionsPopup = Html.addChild(new Popup(new CartOptionsPopup()), this);
		this.searchItemsPopup = Html.addChild(new Popup(new SearchItemsPopup()), this);
		this.addToCartPopup = Html.addChild(new Popup(new AddToCartPopup()), this);
	}

	handleError(errorData, title) {
		const message = errorData.errorCode ? `[@${errorData.errorCode}@]` : `[@something_wrong_text@]`;
		App.instance.messagePopup.show({ symbol:'trouble', title:title, message:message });
		console.error(errorData);
	}

	onLoggedUserChanged() {
		this.model.updateLoggedUser(ApiClient.instance.userService.loggedUser);
		Html.refresh(App.instance);
	}

}
