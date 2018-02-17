class InventoryFileModel {

  constructor(component) {
    this.component = component;
  }

  get imageId() {
    return AppData.instance.getCurrentInventoryItem().image;
  }

  get imageData() {
    return this.component.imageChooser.model.imageData;
  }

  get description() {
    return AppData.instance.getCurrentInventoryItem().description || '';
  }

  loadImageData() {
    return this.imageId ? ApiClient.instance.imageService.getImage(this.imageId) : Promise.resolve(null);
  }

  saveImageData(imageData) {
    if(this.imageId) {
      return ApiClient.instance.imageService.saveImage(this.imageId, this.imageData)
    } else {
      const imageId = Guid.generateNewGUID();
      return ApiClient.instance.imageService.saveImage(imageId, this.imageData)
        .then(() => {
          AppData.instance.getCurrentInventoryItem().image = imageId;
          return ApiClient.instance.inventoryService.saveItem(AppData.instance.getCurrentInventoryItem());
        })
        .then(() => this.component.load());
    }
  }

}

class InventoryFileView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_file';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              <div class='file_header'>
                <button id='${this.id}_save_button' class='save_button'>
                  <span class='lsf symbol'>save</span> [@save_text@]
                </button>
              </div>
              <span>[@description_text@]</span>
              <input type='text' id='${this.id}_input_text' placeholder='' value='${ this.component.model.description }'>
              ${ this.component.imageChooser.view.buildHTML() }
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    Html.setDisabled(`${this.id}_save_button`, this.component.model.imageData === null);
    Html.onClick(`${this.id}_save_button`,() => this.component.onSaveButtonClick());
    Html.onKeyUp(`${this.id}_input_text`, (key) => Html.setDisabled(`${this.id}_save_button`, false));
  }

}

class InventoryFile {

  constructor() {
    this.model = new InventoryFileModel(this);
    this.view = new InventoryFileView(this);
    this.imageChooser = Html.addChild(new ImageChooser('inventory_file_image_chooser'), this);
    this.spinner = Html.addChild(new Spinner('inventory_file_spinner'), this);
  }

  load() {
    return this.model.loadImageData()
      .then((imageData) => this.imageChooser.load(imageData, () => this.onImageChoosed()));
  }

  onImageChoosed() {
    Html.refresh(this);
  }

  onSaveButtonClick() {
    this.spinner.show();
    this.model.saveImageData()
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

}
