import http from 'node:http';
import { URL } from 'node:url';
import config from '../config.js';

import { Page404 } from '../pages/404.js';
import { PageAbout } from '../pages/about.js';
import { PageContacts } from '../pages/contacts.js';
import { PageHome } from '../pages/home.js';
import { PageServices } from '../pages/services.js';



const server = {};

server.httpServer = http.createServer((request, response) => {
    const ssl = request.socket.encryption ? 's' : '';
    const baseURL = `http${ssl}://${request.headers.host}`;
    const parsedURL = new URL(request.url, baseURL);
    const trimmedPath = parsedURL.pathname
        .replace(/^\/+|\/+$/g, "")
        .replace(/\/\/+/g, "/");

    request.on('data', () => {
        console.log("Gaunami duomenys")
    })

    request.on('end', () => {
        let PageClass = server.routes[404];
        if (trimmedPath in server.routes) {
            PageClass = server.routes[trimmedPath]
        }

        const page = new PageClass();
        response.end(page.render());
    })


});

server.routes = {
    '': PageHome,
    'about': PageAbout,
    'services': PageServices,
    'contacts': PageContacts,
    '404': Page404,
};

server.init = () => {
    const PORT = 41069;
    server.httpServer.listen(PORT, () => {
        console.log(config);
        console.log(`Project URL: http://localhost:${PORT}/`)
    });
};

export { server }