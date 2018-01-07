class Html {

  static updateElement(view) {
    const element = document.getElementById(view.id);

    if(element) {
      const htmlText = view.buildHTML();
      element.outerHTML = Localization.instance.localizeHTML(htmlText);
      view.registerEvents();
    }
  }

  static registerClick(id, onClick) {
    const element = document.getElementById(id);
    if(element) {
      element.onclick = onClick;
    }
  }

  static registerMouseDown(id, onClick) {
    const element = document.getElementById(id);
    if(element) {
      element.onmousedown = onClick;
    }
  }

}
