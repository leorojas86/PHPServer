
class AppModel {

	constructor() {
		this.data = {
			user: null,
			currentScreen: null
		};//Default values
	}
}

class AppView {

	constructor() {
	}

	build(data, header) {
		const body = document.getElementById('page-body');
		const headerHTML = header.build(data);
		body.innerHTML = `<div class='app'>
												${ headerHTML }
											</div>`;
	}
}

let _instance = null;

class App
{

	static instance() {
		if(!_instance) {
			_instance = new App();
		}
		return _instance;
	}

	constructor() {
		this.model = new AppModel();
		this.view = new AppView();
		this.header = new Header();
	}

	refreshUI() {
		this.view.build(this.model.data, this.header.view);
	}
}

window.onload = () => {
	App.instance().refreshUI();
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
