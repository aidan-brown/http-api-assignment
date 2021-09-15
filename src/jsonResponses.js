const respondJSON = (request, response, status, object) => {
    response.writeHead(status, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(object));
    response.end();
}

const respondXML = (request, response, status, object) => {
    response.writeHead(status, {'Content-type': 'text/xml'});
    response.write(object);
    response.end();
}

const getSuccess = (request, response, isJSON) => {
    if(isJSON){
        const responseJSON = {
            message: 'This is a successful response'
        }
        respondJSON(request, response, 200, responseJSON);
    } else {
        const responseXML = '<response><message>This is a successful response</message></response>'
        respondXML(request, response, 200, responseXML);
    }
}

const getBadRequest = (request, response, params, isJSON) => {
    const status = params.valid ? 200 : 400;
    const message = params.valid ? 'This request has the required parameter (valid = true)' : 'This request is missing the required parameter (valid = true)'

    if(isJSON){
        const responseJSON = {
            message: message
        }
        if (status == 400){
            responseJSON.id = "badRequest"
        }
        respondJSON(request, response, status, responseJSON)
    } else {
        const responseXML = `<response>${status == 400 ? '<id>badRequest</id>' : ''}<message>${message}</message></response>`
        respondXML(request, response, status, responseXML);
    }
}

const getUnauthorized = (request, response, params, isJSON) => {
    const status = params.loggedIn ? 200 : 401;
    const message = params.loggedIn ? 'This request has the required parameter (loggedIn = true)' : 'This request is missing the required parameter (loggedIn = true)'

    if(isJSON){
        const responseJSON = {
            message: message
        }
        if(status == 401){
            responseJSON.id = 'unauthorized'
        }
        respondJSON(request, response, status, responseJSON)
    } else {
        const responseXML = `<response>${status == 401 ? '<id>unauthorized</id>' : ''}<message>${message}</message></response>`
        respondXML(request, response, status, responseXML);
    }
}

const getForbidden = (request, response, isJSON) => {
    if(isJSON){
        const responseJSON = {
            id: 'forbidden',
            message: 'You do not have access to this content'
        }
        respondJSON(request, response, 403, responseJSON);
    } else {
        const responseXML = `<response><id>forbidden</id><message>'You do not have access to this content'</message></response>`;
        respondXML(request, response, 403, responseXML)
    }
}

const getInternalError = (request, response, isJSON) => {
    if(isJSON){
        const responseJSON = {
            id: 'internalError',
            message: 'Internal Server Error. Something went wrong.'
        }
        respondJSON(request, response, 500, responseJSON);
    } else {
        const responseXML = `<response><id>internalError</id><message>Internal Server Error. Something went wrong.</message></response>`;
        respondXML(request, response, 500, responseXML)
    }
}