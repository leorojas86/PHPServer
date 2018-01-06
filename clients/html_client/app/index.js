window.onload = () => {
	Localization.instance.initialize(LocalizationTable.get(), Config.get().defaultLanguage);
	App.instance.view.refreshUI();
};
