class Html {

  updateElement(id, view) {
    const element = document.getElementById(id);

    if(element) {
      const htmlText = view.buildHTML();
      element.outerHTML = Localization.instance.localizeHTML(htmlText);
      view.registerEvents();
    }
  }

  registerClick(id, onClick) {
    const element = document.getElementById(id);
    if(element) {
      element.onclick = onClick;
    }
  }

  registerMouseDown(id, onClick) {
    const element = document.getElementById(id);
    if(element) {
      element.onmousedown = onClick;
    }
  }

}

Html.instance = new Html();
