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
    const data = this.component.model.data;
    return  `<div align='center'>
               <p class='margin_class'>${data.title}</p>
               <p class='margin_class message'>${data.message}</p>
               <button id='${this.id}_ok_button' class='margin_class'>
                 <span class="lsf symbol">ok</span> [@ok_text@]
               </button>
             </div>`;
  }

  registerEvents() {
    Html.registerClick(`${this.id}_ok_button`, () => this.component.popup.hide());
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

}
