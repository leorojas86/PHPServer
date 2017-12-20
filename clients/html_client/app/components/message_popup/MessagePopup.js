class MessagePopupModel {

  constructor() {
    this.isShown = false;
  }

}

class MessagePopupView {
  constructor(component) {
    this.component = component;
    this.id = 'message_popup';
  }

  buildHTML() {
    if(this.component.model.isShown) {
      const user = this.component.model.user;
      return `<div id='${this.id}' class='${this.id} popup'>
                <div id='${this.id}_grayout' class='grayout'></div>
                <div class='container'>
    						 <p class='margin_class'>${this.component.model.title}</p>
                 <br/><br/>
                 <p class='margin_class'>${this.component.model.message}</p>
    						 <br/><br/>
    			  	   <button id='${this.id}_ok_button'	class='margin_class'>
                  <span class="lsf symbol">out</span> [@logout_button_text@]
                 </button>
                </div>
  			  		</div>`;
    }

    return `<div id='${this.id}'></div>`;
  }

  registerEvents() {
    Html.registerClick(`${this.id}_ok_button`, () => this.component.hide());
    Html.registerMouseDown(`${this.id}_grayout`, (event) => this.component.hide());
  }

  refreshUI() {
    Html.updateElement(this.id, this);
  }
}

class MessagePopup {

  constructor() {
    this.model = new MessagePopupModel();
		this.view = new MessagePopupView(this);
  }

  show(title, message) {
    this.model.title = title;
    this.model.message = message;
    this.model.isShown = true;
    this.view.refreshUI();
  }

  hide() {
    this.model.isShown = false;
    this.view.refreshUI();
  }

}
