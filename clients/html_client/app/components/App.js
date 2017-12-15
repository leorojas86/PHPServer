
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

	buildUI() {
		const body = document.getElementById('page-body');
		const headerHTML = this.component.header.view.buildUI();
		body.innerHTML = `<div class='app'>
												${ headerHTML }
											</div>`;

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

window.onload = () => {
	App.instance = new App();
	App.instance.view.buildUI();
};


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
