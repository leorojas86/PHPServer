
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

	build(header) {
		const body = document.getElementById('page-body');
		body.innerHTML =
		`<div class='app'>
			${ header.build() }
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

	buildUI() {
		this.view.build(this.header.view);
	}
}

window.onload = () => {
	App.instance().buildUI();
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
