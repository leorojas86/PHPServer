window.onload = () => {
	App.instance = new App();
	App.instance.view.refreshUI();

  Localization.instance = new Localization(LocalizationTable.getTable(), 'en');
};
