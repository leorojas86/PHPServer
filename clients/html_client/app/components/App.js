
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

	build(children) {
		const body = document.getElementById('app-body');
		let bodyHTML = '';
		children.forEach((child) => {
			bodyHTML += child.view.build(this.model);
		});
		body.innerHTML = bodyHTML;
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
		this.children = [new Header()/*, new Screen(), new Footer(), new Modals()*/];
	}

	buildUI() {
		this.view.build(this.children);
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
