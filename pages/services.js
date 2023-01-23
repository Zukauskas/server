import { PageTemplate } from "../lib/PageTemplate.js";

class PageServices extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = 'Services';
    }

    mainHTML() {
        return `<h1>Give Us Your Money</h1>`;
    }
}


export { PageServices }