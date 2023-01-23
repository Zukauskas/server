import http from 'node:http';
import { URL } from 'node:url';
import config from '../config.js';

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
        const HTMLhome = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Home</title>
                        </head>
                        <body>
                            HOME CONTENT
                        </body>
                        </html>`;

        const HTMLabout = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>ABout</title>
                        </head>
                        <body>
                            ABOUT CONTENT
                        </body>
                        </html>`;

        const HTML404 = `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>404</title>
                        </head>
                        <body>
                            NOT FOUND
                        </body>
                        </html>`;

        let HTML = server.routes[404];

        if (trimmedPath in server.routes) {
            HTML = server.routes[trimmedPath]
        }


        /*  switch (trimmedPath) {
             case "":
                 HTML = HTMLhome
                 break;
             case "about":
                 HTML = HTMLabout
                 break;
             default:
                 HTML = HTML404
                 break;
         } */
        response.end(HTML)
    })


});

server.routes = {
    '': 'HOME PAGE',
    'about': 'ABOUT PAGE',
    'services': 'SERVICES PAGE',
    '404': '404 PAGE'
};

server.init = () => {
    const PORT = 41069;
    server.httpServer.listen(PORT, () => {
        console.log(config);
        console.log(`Project URL: http://localhost:${PORT}/`)
    });
};

export { server }