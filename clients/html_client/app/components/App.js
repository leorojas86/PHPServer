
class AppModel {

	constructor(component) {
		this.component = component;
		this.loadDefaultAppData();
	}

	loadDefaultAppData() {
		this.data = {
			user: null,
			language:'en',
			currentScreen: 'welcome',
			currentInventoryItem: null
		};//Default values
	}

	updateLoggedUser(user) {
		this.loadDefaultAppData();
		this.data.user = user;
		this.data.currentScreen = user ? 'inventory' : 'welcome';
	}

	get currentScreen() {
		const currentScreen = this.component.screens[this.data.currentScreen];

		if(currentScreen) {
 			return currentScreen;
		}

		console.error('Unknown screen: ', this.data.currentScreen);//TODO: Improve this redirecting to an error page/screen
		return this.component.screens['welcome'];
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
							${ this.component.loginPopup.view.buildHTML() }
              ${ this.component.userPopup.view.buildHTML() }
							${ this.component.messagePopup.view.buildHTML() }
							${ this.component.textPromptPopup.view.buildHTML() }
							${ this.component.settingsPopup.view.buildHTML() }
						</div>`;
	}

	onDomUpdated() {
		this.component.header.view.onDomUpdated();
		this.component.model.currentScreen.view.onDomUpdated();
		this.component.settingsPopup.view.onDomUpdated();
	}

}

class App
{

	constructor() {
		this.model = new AppModel(this);
		this.view = new AppView(this);
		this.header = new Header();
		this.inventory = new Inventory();
		this.welcome = new Welcome();
		this.screens = {
			'welcome': this.welcome,
			'inventory': this.inventory
		};
		this.contextMenu = new DropdownMenu('context_menu');
		this.loginPopup = new Popup(new LoginPopup());
    this.userPopup = new Popup(new UserPopup());
		this.messagePopup = new Popup(new MessagePopup());
		this.textPromptPopup = new Popup(new TextPromptPopup());
		this.settingsPopup = new Popup(new SettingsPopup());

		document.onclick = () => this.contextMenu.hide();
	}

	handleError(errorData, title) {
		const message = errorData.errorCode ? `[@${errorData.errorCode}@]` : `[@something_wrong_text@]`;
		App.instance.messagePopup.show({ symbol:'trouble', title:title, message:message });
		console.error(errorData);
	}

	onLoggedUserChanged(user) {
		this.model.updateLoggedUser(user);
		Html.refresh(App.instance.view);
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
