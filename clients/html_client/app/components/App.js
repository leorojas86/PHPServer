
class AppModel {

	constructor() {
		this.data = {
			env: 'mock',
			user: null,
			currentScreen: null
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
							${ this.component.messagePopup.view.buildHTML() }
						</div>`;
	}

	refreshUI() {
		Html.updateElement(this);
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
		this.messagePopup = new Popup(new MessagePopup());
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
