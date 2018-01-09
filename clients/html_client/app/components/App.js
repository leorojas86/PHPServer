
class AppModel {

	constructor() {
		this.data = {
			env: 'mock',
			user: null,
			currentScreen: null,
			currentInventoryItem: null
		};//Default values
	}

	updateLoggedUser(user) {
		this.data.user = user;
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
							${ this.component.inventory.view.buildHTML() }
							${ this.component.loginPopup.view.buildHTML() }
              ${ this.component.userPopup.view.buildHTML() }
							${ this.component.messagePopup.view.buildHTML() }
						</div>`;
	}

	registerEvents() {
		this.component.header.view.registerEvents();
	}

}

class App
{

	constructor() {
		this.model = new AppModel();
		this.view = new AppView(this);
		this.header = new Header();
		this.inventory = new Inventory();
		this.loginPopup = new Popup(new LoginPopup());
    this.userPopup = new Popup(new UserPopup());
		this.messagePopup = new Popup(new MessagePopup());
	}

	handleError(errorData, title) {
		const message = errorData.errorCode ? `[@${errorData.errorCode}@]` : `[@something_wrong_text@]`;
		App.instance.messagePopup.show({ title:title, message:message });
		console.error(errorData);
	}

	updateLoggedUser(user) {
		this.model.updateLoggedUser(user);
		Html.updateElement(App.instance.view);
		this.inventory.load();
	}

}

App.instance = new App();

/*

App
	- Header
		- ScreenTitle
		- ScreenLinks
			- Home
			- Inventory
			- ?
		- User
	- Body
		- Home
		- Inventory
	- Footer
		- Eula
		- Version
	- Modals
*/
