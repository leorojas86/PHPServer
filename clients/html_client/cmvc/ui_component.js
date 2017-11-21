function AppView() {

	this.build = () => 
	{
		headerController.build();
		bodyController.build();
		footerController.build();
	};
}


function AppController()
{
	//Variables
	this.model = {
		user: null,
		currentScreen: null
	};

	this.children = [new Header(), new Body(), new Footer(), new Modals()];

	this.view = (model) => {
		this.children.foreach((child) => {
			child.view();
		});
	};

	//Methods
	this.buildUI = () => {
		return this.view.build(elementId);
	};
}

var App = new AppController();

/*

App 
	- Header
		- PageTitle
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
