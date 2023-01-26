import http from 'node:http';
import { URL } from 'node:url';
import config from '../config.js';
import { file } from './file.js';
import { utils } from './utils.js';

import { Page404 } from '../pages/404.js';
import { PageAbout } from '../pages/about.js';
import { PageContacts } from '../pages/contacts.js';
import { PageHome } from '../pages/home.js';
import { PageServices } from '../pages/services.js';
import { PageRegister } from '../pages/register.js';

const server = {};

server.httpServer = http.createServer((request, response) => {
    const ssl = request.socket.encryption ? 's' : '';
    const baseURL = `http${ssl}://${request.headers.host}`;
    const parsedURL = new URL(request.url, baseURL);
    const trimmedPath = parsedURL.pathname
        .replace(/^\/+|\/+$/g, '')
        .replace(/\/\/+/g, '/');

    const extension = utils.fileExtension(trimmedPath);

    const textFileExtensions = [
        'css',
        'js',
        'txt',
        'svg',
        'xml',
        'webmanifest',
        'md',
        'markdown',
    ];
    const textBinaryExtensions = [
        'jpg',
        'png',
        'ico',
        'webp',
        'mp3',
        'woff2',
        'woff',
        'ttf',
    ];

    const isTextFile = textFileExtensions.includes(extension);
    const isBinaryFile = textBinaryExtensions.includes(extension);
    const isAPI = trimmedPath.startsWith('api/');
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    const MIMES = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        json: 'application/json',
        txt: 'text/plain',
        svg: 'image/svg+xml',
        xml: 'application/xml',
        webmanifest: 'application/manifest+json',
        md: 'text/markdown',
        markdown: 'text/markdown',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        ico: 'image/x-icon',
        webp: 'image/webp',
        mp3: 'audio/mpeg',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
    };

    request.on('data', () => {
        console.log('Gaunami duomenys');
    });

    request.on('end', async () => {
        if (isTextFile) {
            const [err, content] = await file.readPublic(trimmedPath);

            response.writeHead(err ? 404 : 200, {
                'Content-Type': MIMES[extension],
                'cache-control': `max-age=${err ? 0 : config.cache}`,
            });

            return response.end(err ? 'Sorry, file not found' : content);
        }

        if (isBinaryFile) {
            const [err, content] = await file.readPublicBinary(trimmedPath);

            response.writeHead(err ? 404 : 200, {
                'Content-Type': MIMES[extension],
                'cache-control': `max-age=${err ? 0 : config.cache}`,
            });

            return response.end(err ? 'Sorry, file not found' : content);
        }

        if (isAPI) {
            // temporary solution
            const [err, content] = [false, 'API function response'];

            response.writeHead(err ? 404 : 200, {
                'Content-Type': err ? MIMES.txt : MIMES.json,
            });

            return response.end(
                err
                    ? "Sorry, don't know what you want"
                    : JSON.stringify(content)
            );
        }

        if (isPage) {
            let PageClass = server.routes[404];
            if (trimmedPath in server.routes) {
                PageClass = server.routes[trimmedPath];
            }

            const page = new PageClass();

            response.writeHead(200, {
                'Content-Type': MIMES.html,
            });

            response.end(page.render());
        }
    });
});

server.routes = {
    '': PageHome,
    about: PageAbout,
    services: PageServices,
    contacts: PageContacts,
    register: PageRegister,
    404: Page404,
};

server.init = () => {
    const PORT = 41069;
    server.httpServer.listen(PORT, () => {
        console.log(config);
        console.log(`Project URL: http://localhost:${PORT}/`);
    });
};

export { server };
