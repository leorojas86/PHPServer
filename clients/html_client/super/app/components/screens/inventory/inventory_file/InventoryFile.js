class InventoryFileModel {

  constructor(component) {
    this.component = component;
  }

  get imageData() {
    return this.component.imageChooser.model.imageData;
  }

  get item() {
    return AppData.instance.getCurrentInventoryItem();
  }

  get imageId() {
    return this.item.image;
  }

  _saveImageData() {
    if(this.imageId) {
      return ApiClient.instance.imageService.saveImage(this.imageId, this.imageData)
        .then(() => this.imageId);
    } else {
      const imageId = Guid.generateNewGUID();
      return ApiClient.instance.imageService.saveImage(imageId, this.imageData)
        .then(() => imageId);
    }
  }

  loadImageData() {
    return this.imageId ? ApiClient.instance.imageService.getImage(this.imageId) : Promise.resolve(null);
  }

  saveData() {
    if(this.imageData) {
      return this._saveImageData()
        .then((imageId) => {
          this.item.image = imageId;
          return ApiClient.instance.inventoryService.saveItem(this.item);
        });
    } else {
      this.item.image = undefined;
      return ApiClient.instance.inventoryService.saveItem(this.item);
    }
  }

  addToCart() {
    return ApiClient.instance.cartService.addToCurrentCart(AppData.instance.data.user.id, AppData.instance.getCurrentInventoryItem(), 1);
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
                <button id='${this.id}_add_to_cart_button'>
                  <span class='lsf symbol'>cart</span> [@add_to_cart_text@]
                </button>
                <button id='${this.id}_save_button' class='save_button'>
                  <span class='lsf symbol'>save</span> [@save_text@]
                </button>
              </div>
              <table>
                <tr>
                  <th>[@description_text@]</th>
                  <th><input type='text' id='${this.id}_description_input_text' placeholder='' value='${ this.component.model.item.description || '' }'></th>
                </tr>
                <tr>
                  <th>[@unit_text@]</th>
                  <th><input type='text' id='${this.id}_unit_input_text' placeholder='' value='${ this.component.model.item.unit || ''  }'></th>
                </tr>
                <tr>
                  <th>[@price_per_unit_text@]</th>
                  <th><input type='text' id='${this.id}_price_per_unit_input_text' placeholder='' value='${ this.component.model.item.pricePerUnit || ''  }'></th>
                </tr>
              </table>
              ${ this.component.imageChooser.view.buildHTML() }
              ${ this.component.spinner.view.buildHTML() }
            </div>`;
  }

  onDomUpdated() {
    Html.onClick(`${this.id}_add_to_cart_button`,() => this.component.onAddToCartButtonClicked());
    Html.setDisabled(`${this.id}_save_button`, this.component.model.imageData === null);
    Html.onClick(`${this.id}_save_button`,() => this.component.onSaveButtonClick());
    Html.onKeyUp(`${this.id}_description_input_text`, (key) => Html.setDisabled(`${this.id}_save_button`, false));
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
    this.model.saveData()
      .catch((reason) => App.instance.handleError(reason, '[@load_error_text@]'))
      .finally(() => {
        this.spinner.hide();
        Html.refresh(this);
      });
  }

  onAddToCartButtonClicked() {
    App.instance.addToCartPopup.show({ item:AppData.instance.getCurrentInventoryItem() });
  }

}
