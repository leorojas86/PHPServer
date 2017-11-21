function AppView() {

	this.build = () => 
	{
		headerController.build();
		bodyController.build();
		footerController.build();
	};
}

function AppModel() {

}


function AppController()
{
	//Variables
	this.model = new AppModel();
	this.view = new AppView();

	//Initialization
	this.view.listener = this;
	this.view.data = model.data;

	//Methods
	this.buildUI = function(elementId)
	{
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
