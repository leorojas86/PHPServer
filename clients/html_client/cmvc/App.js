
class AppModel()
{
	constructor()
	{
		this.data = { user: null, currentScreen: null };//Default values
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
	static _instance = new App();

	static instance() 
	{
		return _app;
	}

	constructor()
	{
		this.model = new AppModel();
		this.view = new AppView();
		this.children = [new Header(), new Screen(), new Footer(), new Modals()];
	}

	buildUI()
	{
		this.view.build(this.children);
	}
}

App.instance.buildUI();

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
