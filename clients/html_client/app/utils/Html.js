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
    const element = document.getElementById(id);
    if(element) {
      element.onmousedown = onClick;
    }
  }

  static setDisabled(id, disabled) {
    const element = document.getElementById(id);
    if(element) {
      element.disabled = disabled;
    }
  }

  static isDisabled(id) {
    const element = document.getElementById(id);
    if(element) {
      return element.disabled;
    }
    return true;
  }

  static onKeyUp(id, onKeyUp) {
    const element = document.getElementById(id);
    if(element) {
      element.onkeyup = onKeyUp;
    }
  }

  static getValue(id) {
    const element = document.getElementById(id);
    if(element) {
      return element.value;
    }
  }

}
