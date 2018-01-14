class BreadcrumbModel {

  constructor(onPathNameClicked) {
    this.data = { path:[] };
    this.onPathNameClicked = onPathNameClicked;
  }

}

class BreadcrumbView {

  constructor(id, component) {
    this.id = id;
    this.component = component;
  }

  buildHTML() {
    let pathHTML = '';
    let index = 0;
    this.component.model.data.path.forEach((currentItemName) => {
      if(index === 0) { //First one
        pathHTML += `<span id='path_${index}' class="lsf symbol home">home</span>`;
      } else if(index === this.component.model.data.path.length - 1) { //Last one
        pathHTML += `<span class="lsf symbol arrow">right</span><span id='path_${index}'>${currentItemName}</span>`;
      } else {
        pathHTML += `<span class="lsf symbol arrow">right</span><span id='path_${index}' class='clickable_path_item'>${currentItemName}</span>`;
      }
      index++;
    });

    return `<div id='${this.id}' class='${this.id} breadcrumb'>
              ${pathHTML}
            </div>`;
  }

  onDomUpdated() {
    const path = this.component.model.data.path;
    path.forEach((currentItemName) => {
      const index = path.indexOf(currentItemName);
      if(index < path.length - 1) { //Not the last one
        Html.registerClick(`path_${index}`, () => this.component.model.onPathNameClicked(index));
      }
    });
  }

}

class Breadcrumb {

  constructor(id, onPathNameClicked) {
    this.model = new BreadcrumbModel(onPathNameClicked);
    this.view = new BreadcrumbView(id, this);
  }

}
