import { PageTemplate } from "../lib/PageTemplate.js";

class PageContacts extends PageTemplate {

    constructor() {
        super();
        this.pageTitle = 'Contacts';
    }

    mainHTML() {
        return `<h1>Contacts Us</h1>`;
    }
}


export { PageContacts }