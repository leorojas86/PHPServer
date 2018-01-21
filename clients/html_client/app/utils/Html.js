class Html {

  static refresh(view) {
    const element = document.getElementById(view.id);
    if(element) {
      const htmlText = view.buildHTML();
      element.outerHTML = Localization.instance.localizeHTML(htmlText);
      if(view.onDomUpdated) {
        view.onDomUpdated();
      }
    }
  }

  static onClick(id, onClick) {
    document.getElementById(id).onclick = onClick;
  }

  static onMouseDown(id, onMouseDown) {
    document.getElementById(id).onmousedown = onMouseDown;
  }

  static onKeyUp(id, onKeyUp) {
    document.getElementById(id).onkeyup = onKeyUp;
  }

  static onChange(id, onChange) {
    document.getElementById(id).onchange = onChange;
  }

  static setDisabled(id, disabled) {
    document.getElementById(id).disabled = disabled;
  }

  static isDisabled(id) {
    return document.getElementById(id).disabled;
  }

  static getValue(id) {
    return document.getElementById(id).value;
  }

}
