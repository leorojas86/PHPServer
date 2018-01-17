class TextPromptPopupModel {

  constructor() {

  }

}

class TextPromptPopupView {

  constructor(component) {
    this.component = component;
    this.id = 'text_prompt_popup';
  }

  buildHTML() {
    const data = this.component.model.data;
    return  `<div align='center'>
               <span class='title'>${data.title}</span>
               <p>
                <input type='text' id='${this.id}_input_text' placeholder='${data.placeholder}' value=''>
               </p>
               <button id='${this.id}_ok_button'>
                 <span class="lsf symbol">ok</span> [@ok_text@]
               </button>
               <button id='${this.id}_cancel_button'>
                 <span class="lsf symbol">close</span> [@cancel_text@]
               </button>
             </div>`;
  }

  onDomUpdated() {
    Html.registerMouseDown(`${this.id}_grayout`, () => {});//Do nothing
    Html.registerClick(`${this.id}_ok_button`, () => {
      const inputValue = Html.getValue(`${this.id}_input_text`);
      this.component.popup.hide();
      this.component.model.data.onTextEntered(inputValue);
    });
    Html.registerClick(`${this.id}_cancel_button`, () => this.component.popup.hide());
    Html.setDisabled(`${this.id}_ok_button`, true);
    Html.onKeyUp(`${this.id}_input_text`, () => {
      const inputValue = Html.getValue(`${this.id}_input_text`);
      Html.setDisabled(`${this.id}_ok_button`, !inputValue);
    });
  }

}

class TextPromptPopup {

  constructor() {
    this.model = new TextPromptPopupModel();
		this.view = new TextPromptPopupView(this);
  }

}
