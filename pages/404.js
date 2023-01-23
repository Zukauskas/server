import { PageTemplate } from "../lib/PageTemplate.js";

class Page404 extends PageTemplate {
    mainHTML() {
        return `<h1>404</h1>`
    }
}


export { Page404 }