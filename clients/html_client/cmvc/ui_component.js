
function App()
{
	//Variables
	this.model = {
		user: null,
		currentScreen: null
	};
	this.children = [new Header(), new Body(), new Footer(), new Modals()];

	//Methods
	this.view = () => {
		this.children.foreach((child) => child.view(this.model));
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
