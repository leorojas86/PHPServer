class MessagePopupModel {

  constructor() {
  }

}

class MessagePopupView {

  constructor(component) {
    this.component = component;
    this.id = 'message_popup';
  }

  buildHTML() {
    return this.component.popup.view.buildHTML(
      `<p class='margin_class'>${this.component.model.title}</p>
       <p class='margin_class message'>${this.component.model.message}</p>
       <button id='${this.id}_ok_button'	class='margin_class'>
         <span class="lsf symbol">ok</span> [@ok_text@]
       </button>`
     );
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
    this.popup = new Popup(this.view.id);
  }

  show(title, message) {
    this.model.title = title;
    this.model.message = message;
    this.popup.model.isShown = true;
    this.view.refreshUI();
  }

  hide() {
    this.popup.model.isShown = false;
    this.view.refreshUI();
  }

}
