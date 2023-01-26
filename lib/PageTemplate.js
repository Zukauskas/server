class PageTemplate {
    constructor() {
        this.baseTitle = 'Pomidoras';
        this.pageTitle = '';
        this.scripts = [];
    }

    headHTML() {
        const title =
            this.pageTitle === ''
                ? this.baseTitle
                : `${this.pageTitle} | ${this.baseTitle}`;
        return `<head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title}</title>
                    <link rel="stylesheet" href="/css/main.css">
                    <link rel="stylesheet" href="/css/admin.css">
                    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon">
                </head>`;
    }

    headerHTML() {
        return `<header>
                    <img class="logo" src='/images/logo-dark.png' alt="logo">
                    <nav>
                        <a href="/"> Home</a>
                        <a href="/about"> About</a>
                        <a href="/services"> Services</a>
                        <a href="/contacts"> Contacts</a>
                        <a href="/register"> Register</a>
                    </nav>
                </header>`;
    }

    footerHTML() {
        return ` <footer>
                    <p> 2023 - All rights reserved</p>
                </footer>`;
    }

    scriptHTML() {
        let HTML = '';
        for (const script of this.scripts) {
            HTML += `<script src="/js/${script}.js" type="module"></script>`;
        }
        return HTML;
    }

    mainHTML() {
        return `<h1> SOME PAGE TEMPLATE </h1>
                <p>Lorem ipsum doler sit amet.</p>`;
    }

    render() {
        return `<!DOCTYPE html>
                <html lang="en">
                ${this.headHTML()}
                <body>
                    ${this.headerHTML()}
                    <main>
                        ${this.mainHTML()}
                    </main>
                    ${this.footerHTML()}
                    ${this.scriptHTML()}
                </body>
                </html>`;
    }
}

export { PageTemplate };
