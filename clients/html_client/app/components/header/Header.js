class HeaderModel {

}

class HeaderView {

  build() {
    return `<div class='header'>Inventory</div>`;
  }
}

class Header {

  constructor() {
		this.model = new HeaderModel();
		this.view = new HeaderView();
	}

  buildUI() {
		this.view.build();
	}
}
