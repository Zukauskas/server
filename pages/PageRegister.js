import { PageTemplate } from '../lib/PageTemplate.js';

class PageRegister extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = 'Register';
        this.scripts = ['register'];
    }

    mainHTML() {
        return `<h1>Register</h1>
                <form class="form" action="/api/register" method="POST">
                    <div class="form-row">
                        <label for="username">Username</label>
                        <input id="username" type="text" required>
                    </div>
                    <div class="form-row">
                        <label for="email">Email</label>
                        <input id="email" type="email" required>
                    </div>
                    <div class="form-row">
                        <label for="pass">Password</label>
                        <input id="pass" type="password" required>
                    </div>
                    <div class="form-row">
                        <label for="repass">Repeat password</label>
                        <input id="repass" type="password" required>
                    </div>
                    <div class="form-row">
                        <label for="tos"><input id="tos" type="checkbox" required> Sutinku su <a href="/tos">taisyklemis</a></label>
                    </div>
                    <div class="form-row">
                        <button type="submit">Register now!</button>
                    </div>
                </form>`;
    }
}

export { PageRegister };
