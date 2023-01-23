import { PageTemplate } from "../lib/PageTemplate.js";

class PageAbout extends PageTemplate {
    mainHTML() {
        return `<h1>About US</h1>`
    }
}


export { PageAbout }