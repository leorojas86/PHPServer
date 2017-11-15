function UIComponent(model, view, controller)
{
	//Variables
	this.model = model;
	this.view = view;
	this.controller = controller;

	//Initialization
	this.view.listener = controller;
	this.view.data = model.data;
	this.controller.model = model;

	//Methods
	this.buildUI = function(elementId)
	{
		return this.view.build(elementId);
	};
}

