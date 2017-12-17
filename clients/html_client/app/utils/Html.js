class Html {

  updateElement(id, view) {
    const element = document.getElementById(id);

    if(element) {
      const htmlText = view.buildHTML();
      const localizedHTML = Localization.instance.localizeHTML(htmlText);
      element.outerHTML = localizedHTML;
      view.registerEvents();
    }
  }

  registerElementClick(id, onClick) {
    const element = document.getElementById(id);
    if(element) {
      element.onclick = onClick;
    }
  }

}

Html.instance = new Html();
