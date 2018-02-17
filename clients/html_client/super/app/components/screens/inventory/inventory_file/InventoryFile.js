class InventoryFileModel {

  constructor() {
    this.imageData = null;
  }

  _getImageId() {
    return AppData.instance.getCurrentInventoryItem().image;
  }

  get description() {
    return AppData.instance.getCurrentInventoryItem().description || '';
  }

  saveImageData() {
    let imageId = this._getImageId();
    if(imageId) {
      return ApiClient.instance.imageService.saveImage(imageId, this.imageData)
    } else {
      imageId = Guid.generateNewGUID();
      return ApiClient.instance.imageService.saveImage(imageId, this.imageData)
        .then(() => {
          AppData.instance.getCurrentInventoryItem().image = imageId;
          return ApiClient.instance.inventoryService.saveItem(AppData.instance.getCurrentInventoryItem());
        })
        .then(() => this.loadImageData());
    }
  }

  loadImageData() {
    this.imageData = null;
    const imageId = this._getImageId();
    if(imageId) {
      return ApiClient.instance.imageService.getImage(imageId)
        .then((imageData) => this.imageData = imageData);
    }
    return Promise.resolve();
  }

}

class InventoryFileView {

  constructor(component) {
    this.component = component;
    this.id = 'inventory_file';
  }

  buildHTML() {
    const imageHtml = this.component.model.imageData ?
      `<img src='${this.component.model.imageData}'/>`
      :
      `<span class='lsf symbol'>image</span>`;
    return `<div id='${this.id}' class='${this.id}'>
              <div class='file_header'>
                <button id='${this.id}_save_button' class='save_button'>
                  <span class='lsf symbol'>save</span> [@save_text@]
                </button>
              </div>
              <span>[@description_text@]</span>
              <input type='text' id='${this.id}_input_text' placeholder='' value='${ this.component.model.description }'>
              <div class='image' align='center'>
                ${imageHtml}
                <button id='${this.id}_image_button' class='select_image_button'>
                  <span class='lsf symbol'>image</span>
                  <span>[@select_image_text@]</span>
                  <input  id='${this.id}_image_input'
                          type='file'
                          accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp, image/tif"
                          style="display:none;">
                </button>
              </div>
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_image_button`, () => Html.getElement(`${this.id}_image_input`).click());
    Html.onChange(`${this.id}_image_input`, () => this.component.onImageSelected());
    Html.setDisabled(`${this.id}_save_button`, this.component.model.imageData === null);
    Html.onClick(`${this.id}_save_button`,() => this.component.onSaveButtonClick());
    Html.onKeyUp(`${this.id}_input_text`, (key) => Html.setDisabled(`${this.id}_save_button`, false));
  }

}

class InventoryFile {

  constructor() {
    this.model = new InventoryFileModel();
    this.view = new InventoryFileView(this);
    this.spinner = Html.addChild(new Spinner('inventory_file_spinner'), this);
  }

  load() {
    return this.model.loadImageData();
  }

  onImageSelected() {
    this.spinner.show();
    Html.getImageData(`${this.view.id}_image_input`)
      .then((imageData) => this.model.imageData = imageData)
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
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
