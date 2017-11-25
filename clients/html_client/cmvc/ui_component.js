
class AppModel()
{
	constructor()
	{
		this.data = { user: null, currentScreen: null };
	}
}

class AppView()
{
	constructor()
	{
		this.html =
			`<div id="header" />
			 <div id="screen" />
			 <div id="footer" />
			 <div id="modals" />`;
	}

	build(children)
	{
		const body = document.getElementsByTagName('body')[0];
		body.innerHTML = this.html;
		children.foreach((child) => child.view.build(this.model));
	}
}


class App()
{
	constructor()
	{
		this.model = new AppModel();
		this.view = new AppView();
		this.children = [new Header(), new Screen(), new Footer(), new Modals()];
	}

	//Methods
	buildUI()
	{
		this.view.build(this.children);
	}
}

var App = new App();
App.buildUI();

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
