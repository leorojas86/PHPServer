class Html {
  updateElement(id, html) {
    const localizedHTML = Localization.instance.localizeHTML(html);
    const element = document.getElementById(id);
    element.outerHTML = localizedHTML;
  }
}

Html.instance = new Html();
