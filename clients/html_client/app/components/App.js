
class AppModel {

	constructor() {
		this.data = {
			user: null,
			currentScreen: null
		};//Default values
	}

}

class AppView {

	constructor(component) {
		this.component = component;
	}

	buildHTML() {
		return `<div id='app' class='app'>
							${ this.component.header.view.buildHTML() }
						</div>`;
	}

	refreshUI() {
		document.getElementById('app').outerHTML = this.buildHTML();
		this.registerEvents();
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
	}

}


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
