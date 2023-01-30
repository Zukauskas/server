import http from 'node:http';
import { URL } from 'node:url';
import { StringDecoder } from 'node:string_decoder';
import config from '../config.js';
import { file } from './file.js';
import { utils } from './utils.js';

import { Page404 } from '../pages/Page404.js';
import { PageAbout } from '../pages/PageAbout.js';
import { PageContacts } from '../pages/PageContacts.js';
import { PageHome } from '../pages/PageHome.js';
import { PageServices } from '../pages/PageServices.js';
import { PageRegister } from '../pages/PageRegister.js';

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


    let buffer = '';
    const stringDecoder = new StringDecoder('utf-8');

    request.on('data', (data) => {
        console.log(data);
        buffer += stringDecoder.write(data);
    });

    request.on('end', async () => {
        buffer += stringDecoder.end();

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
            const api = trimmedPath.split('/')[1];
            let [err, content] = [false, 'Sorry, don\'t know what you want...'];

            if (api in server.api) {
                const data = JSON.parse(buffer);
                console.log(data);
                [err, content] = [false, 'API function response'];
            }

            response.writeHead(err ? 404 : 200, {
                'Content-Type': err ? MIMES.txt : MIMES.json,
            });

            return response.end(JSON.stringify(content)
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

server.api = {
    register: null,
}

server.init = () => {
    const PORT = 41069;
    server.httpServer.listen(PORT, () => {
        console.log(config);
        console.log(`Project URL: http://localhost:${PORT}/`);
    });
};

export { server };
