window.onload = () => {
	Localization.instance.initialize(LocalizationTable.get(), 'en');
	App.instance.view.refreshUI();
};
