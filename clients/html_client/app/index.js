window.onload = () => {
	Localization.instance.initialize(LocalizationTable.get(), App.instance.model.data.language);
	Html.updateElement(App.instance.view);
};
