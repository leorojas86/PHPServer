window.onload = () => {
	Localization.instance.initialize(LocalizationTable.get(), Config.get().defaultLanguage);
	Html.updateElement(App.instance.view);
};
