class WelcomeView {

  constructor() {
    this.id = 'welcome_screen';
  }

  buildHTML() {
    return `<div id='${this.id}' class='${this.id}'>
              <p>[@login_to_get_started_text@]</p>
            </div>`;
  }

  registerEvents() {

  }

}

class Welcome {

  constructor() {
    this.view = new WelcomeView();
  }

}
