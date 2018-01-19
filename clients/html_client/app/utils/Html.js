class Html {

  static updateElement(view) {
    const element = document.getElementById(view.id);
    if(element) {
      const htmlText = view.buildHTML();
      element.outerHTML = Localization.instance.localizeHTML(htmlText);
      if(view.onDomUpdated) {
        view.onDomUpdated();
      }
    }
  }

  static registerClick(id, onClick) {
    document.getElementById(id).onclick = onClick;
  }

  static registerMouseDown(id, onClick) {
    document.getElementById(id).onmousedown = onClick;
  }

  static setDisabled(id, disabled) {
    document.getElementById(id).disabled = disabled;
  }

  static isDisabled(id) {
    return document.getElementById(id).disabled;
  }

  static onKeyUp(id, onKeyUp) {
    document.getElementById(id).onkeyup = onKeyUp;
  }

  static getValue(id) {
    return document.getElementById(id).value;
  }

}
