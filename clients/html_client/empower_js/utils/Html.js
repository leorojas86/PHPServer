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
    document.getElementById(id).oncontextmenu = (event) => {
      onContextMenu(event);
      return false;
    };
		if(Platform.isIOS())//HACK: Fix iOS oncontextmenu event
		{
			let startTime = null;
			scrollPanel.addEventListener('touchstart', (e) => {
				startTime = new Date();
				return false;
			}, true);
			scrollPanel.addEventListener('touchend', (e) => {
				const elapsedTime = new Date() - startTime;
				if(startTime != null && elapsedTime > 500)//Hold for half a second
				{
					//scrollPanel.style.pointerEvents = "none";
					setTimeout(() => {
						onContextMenu(e.changedTouches[0]);
            startTime = null;
						//scrollPanel.style.pointerEvents = "all";
					}, 500);
				}
				return false;
			}, true);
		}
  }

}
