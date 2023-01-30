import { PageTemplate } from "../lib/PageTemplate.js";

class PageAbout extends PageTemplate {

    constructor() {
        super();
        this.pageTitle = 'About us';
    }

    mainHTML() {
        return `<h1>About US</h1>`;
    }
}


export { PageAbout }