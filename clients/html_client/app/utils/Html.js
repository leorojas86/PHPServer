class Html {

  updateElement(id, view) {
    const htmlText = view.buildHTML();
    const localizedHTML = Localization.instance.localizeHTML(htmlText);
    const element = document.getElementById(id);
    element.outerHTML = localizedHTML;
    view.registerEvents();
  }

}

Html.instance = new Html();
