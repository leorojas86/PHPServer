
function App()
{
	//Variables
	this.model = {
		user: null,
		currentScreen: null
	};
	this.children = [new Header(), new Body(), new Footer(), new Modals()];

	//Methods
	this.view = (model) => {
		this.children.foreach((child) => {
			child.view();
		});
	};
}

var App = new App();

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
