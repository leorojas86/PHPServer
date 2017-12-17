class Html {

  updateElement(id, view) {
    const htmlText = view.buildHTML();
    const localizedHTML = Localization.instance.localizeHTML(htmlText);
    const element = document.getElementById(id);

    if(!element) {
      console.log('element not found for ' + id);
    }

    element.outerHTML = localizedHTML;
    view.registerEvents();
  }

  registerElementClick(id, onClick) {
    const element = document.getElementById(id);
    if(element) {
      element.onclick = onClick;
    }
  }

}

Html.instance = new Html();
