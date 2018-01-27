class InventoryFileModel {

}

class InventoryFileView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_file';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              <button id='${this.id}_image_button' class='select_image_button'>
                <span class='lsf symbol'>image</span>
                <span>[@select_image_text@]</span>
                <input type='file' id='${this.id}_image_input' style="display:none;">
              </button>
              <button id='${this.id}_upload_button'>
                <span class='lsf symbol'>save</span> [@save_text@]
              </button>
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_image_button`, () => Html.getElement(`${this.id}_image_input`).click());
  }

}

class InventoryFile {

  constructor() {
    this.model = new InventoryFileModel();
    this.view = new InventoryFileView(this);
  }

  load() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

}
