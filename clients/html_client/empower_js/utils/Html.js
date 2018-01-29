class Html {

  static addChild(component, parent) {
    if(parent.childrenComponents) {
      parent.childrenComponents.push(component);
    } else {
      parent.childrenComponents = [component];
    }
    return component;
  }

  static notifyOnDomUpdatedRecursively(component) {
    if(component.view.onDomUpdated && document.getElementById(component.view.id)) {
      component.view.onDomUpdated();
    }
    if(component.childrenComponents) {
      component.childrenComponents.forEach((currentChild) => Html.notifyOnDomUpdatedRecursively(currentChild));
    }
  }

  static refresh(component) {
    const element = document.getElementById(component.view.id);
    if(element) {
      const htmlText = component.view.buildHTML();
      element.outerHTML = Localization.instance.localizeHTML(htmlText);
      Html.notifyOnDomUpdatedRecursively(component);
    }
  }

  static getElement(id) {
    return document.getElementById(id);
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

  static setFocus(id) {
    return document.getElementById(id).focus();
  }

  static getImageData(id) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {//TODO: Handle error case
        resolve(e.target.result);
      };
      reader.readAsDataURL(document.getElementById(id).files[0]);
    });
  }

  static onContextMenu(id, onContextMenu) {
    const element = document.getElementById(id);
    element.oncontextmenu = (event) => {
      onContextMenu(event);
      return false;
    };
		if(Platform.isiOS())//HACK: Fix iOS oncontextmenu event
		{
			let holdTimeoutId = null;
			element.addEventListener('touchstart', (e) => {
				holdTimeoutId = holdTimeoutId || setTimeout(() => onContextMenu(e.changedTouches[0]), 500);
        element.style.pointerEvents = "none";
				return false;
			}, true);
			element.addEventListener('touchend', (e) => {
        clearTimeout(holdTimeoutId);
        holdTimeoutId = null;
        element.style.pointerEvents = "all";
				return false;
			}, true);
		}
  }

  static convertToScrolledPosition(point) {
    const pageScrolledXOffset = window.pageXOffset || document.documentElement.scrollLeft;
		const pageScrolledYOffset = window.pageYOffset || document.documentElement.scrollTop;
		point.x += pageScrolledXOffset;
		point.y += pageScrolledYOffset;
    return point;
  }

}