const fs = require('fs');

const readJSONFromFile = function(filename) {
    let data = fs.readFileSync(filename);
    return JSON.parse(data.toString());
};


exports.handleUpdate = function(filename, res) {
    let request = filename.split("/update/")[1];
    let name = request.split("=")[0];
    let count = request.split("=")[1];

    let parameters = readJSONFromFile("./data.txt");
    for (let i = 0; i < parameters.length; i++) {
        if (parameters[i].id === name) {
            parameters[i].value = count;
        }
    }

    fs.writeFileSync("./data.txt", JSON.stringify(parameters), function (err) {
        if (err) {
            throw err;
        }
    });

    console.log("Received: " + request);
    res.writeHead(200);
    res.end();
};

exports.handleInitialRequest = function(filename, res) {
    let request = filename.split("/request/")[1];

    let returnValue = "ERROR";
    let parameters = readJSONFromFile("./data.txt");
    for (let i = 0; i < parameters.length; i++) {
        if (parameters[i].id === request) {
            returnValue = parameters[i].value;
        }
    }

    console.log("Sent value for: " + request);
    res.writeHead(200);
    res.write(returnValue.toString());
    res.end();
};

exports.handleFileRequest = function(filename, res) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            console.log("Failed");
            res.end("404 Not Found")
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            console.log("Sent: " + filename);
            res.end();
        }
    });
};