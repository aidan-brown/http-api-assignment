const http = require('http');
const url = require('url');
const apiHandler = require('./apiResponses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    const queryObject = url.parse(request.url, true).query;
    const urlStr = request.url.split('?')[0];
    const isJSON = request.headers.accept == 'application/json';
    console.log(urlStr);

    switch(urlStr){
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        case '/style.css':
            htmlHandler.getCSS(request, response);
            break;
        case '/success':
            apiHandler.getSuccess(request, response, isJSON);
            break;
        case '/badRequest':
            apiHandler.getBadRequest(request, response, queryObject, isJSON);
            break;
        case '/unauthorized':
            apiHandler.getUnauthorized(request, response, queryObject, isJSON);
            break;
        case '/forbidden':
            apiHandler.getForbidden(request, response, isJSON);
            break;
        case '/internal':
            apiHandler.getInternalError(request, response, isJSON);
            break;
        case '/notImplemented':
            apiHandler.getNotImplemented(request, response, isJSON);
            break;
        default:
            apiHandler.getNotFound(request, response, isJSON);
            break;
    }
}

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1:${port}`);