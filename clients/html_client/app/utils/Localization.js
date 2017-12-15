class Localization {

  constructor() {
  }

  initialize(localizationTable, currentLanguage) {
    this.localizationTable = localizationTable;
    this.currentLanguage = currentLanguage;
  }

  localizeHTML(html) {
    return html;
  }
}

Localization.instance = new Localization();
