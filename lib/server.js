import http from 'node:http';
import { URL } from 'node:url';
import config from '../config.js';

import { Page404 } from '../pages/404.js';
import { PageAbout } from '../pages/about.js';
import { PageContacts } from '../pages/contacts.js';
import { PageHome } from '../pages/home.js';
import { PageServices } from '../pages/services.js';
import { utils } from './utils.js';



const server = {};

server.httpServer = http.createServer((request, response) => {
    const ssl = request.socket.encryption ? 's' : '';
    const baseURL = `http${ssl}://${request.headers.host}`;
    const parsedURL = new URL(request.url, baseURL);
    const trimmedPath = parsedURL.pathname
        .replace(/^\/+|\/+$/g, "")
        .replace(/\/\/+/g, "/");

    const extension = utils.fileExtension(trimmedPath);

    const textFileExtensions = ['css', 'js', 'txt', 'svg', 'webmanifest', 'md', 'markdown'];
    const textBinaryExtensions = ['jpg', 'png', 'ico', 'webp', 'mp3'];

    const isTextFile = textFileExtensions.includes(extension);
    const isBinaryFile = textBinaryExtensions.includes(extension);
    const isAPI = trimmedPath.startsWith('api/');
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    request.on('data', () => {
        console.log("Gaunami duomenys")
    })

    request.on('end', () => {
        if (isTextFile) {
            // rasti faila
            // jeigu radau -> perskaityti jo turini
            // jeigu NEradau -> klaida
            response.end('STAI TAU TEKSTINIO FAILO TURINYS...');
        }

        if (isBinaryFile) {
            // rasti faila
            // jeigu radau -> perskaityti jo turini
            // jeigu NEradau -> klaida
            response.end('STAI TAU BINARY FAILO TURINYS...');
        }

        if (isAPI) {
            // ar turiu norima API
            // jeigu turiu -> dirba
            // jeigu NEturiu -> klaida
            response.end('STAI TAU API ATSAKYMAS...');
        }

        if (isPage) {
            let PageClass = server.routes[404];
            if (trimmedPath in server.routes) {
                PageClass = server.routes[trimmedPath];
            }

            const page = new PageClass();
            response.end(page.render());
        }
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