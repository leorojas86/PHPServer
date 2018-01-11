
class AppModel {

	constructor(component) {
		this.data = {
			env: 'mock',
			user: null,
			currentScreen: 'Welcome',
			currentInventoryItem: null
		};//Default values
		this.component = component;
	}

	updateLoggedUser(user) {
		this.data.user = user;
		this.data.currentScreen = user ? 'Inventory' : 'Welcome';
	}

	get currentScreen() {
		const currentScreen = this.component.screens[this.data.currentScreen];

		if(currentScreen) {
 			return currentScreen;
		}

		console.error('Unknown screen: ', this.data.currentScreen);//TODO: Improve this redirecting to an error page/screen
		return this.component.screens['Welcome'];
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
							${ this.component.loginPopup.view.buildHTML() }
              ${ this.component.userPopup.view.buildHTML() }
							${ this.component.messagePopup.view.buildHTML() }
						</div>`;
	}

	registerEvents() {
		this.component.header.view.registerEvents();
		this.component.model.currentScreen.view.registerEvents();
	}

}

class App
{

	constructor() {
		this.model = new AppModel(this);
		this.view = new AppView(this);
		this.header = new Header();
		this.inventory = new Inventory();
		this.loginPopup = new Popup(new LoginPopup());
    this.userPopup = new Popup(new UserPopup());
		this.messagePopup = new Popup(new MessagePopup());

		this.screens = {
			'Welcome': new Welcome(),
			'Inventory': new Inventory()
		};
	}

	handleError(errorData, title) {
		const message = errorData.errorCode ? `[@${errorData.errorCode}@]` : `[@something_wrong_text@]`;
		App.instance.messagePopup.show({ symbol:'trouble', title:title, message:message });
		console.error(errorData);
	}

	updateLoggedUser(user) {
		this.model.updateLoggedUser(user);
		Html.updateElement(App.instance.view);
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
