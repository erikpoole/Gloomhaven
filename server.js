const http = require('http');
const url = require('url');

const handling = require('./handling_module')

http.createServer(function (req, res) {
    let filename = "."  + url.parse(req.url, true).pathname;

    if (filename.includes('/update/')) {
        handling.handleUpdate(filename, res);

    } else if(filename.includes('/request/')) {
        handling.handleInitialRequest(filename, res);

    } else {
        handling.handleFileRequest(filename, res);
    }
}).listen(8080);