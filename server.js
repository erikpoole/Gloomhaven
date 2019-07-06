const http = require('http')

const handling = require('./handling_module')

http
  .createServer(function (req, res) {
    let filename = '.' + req.url
    console.log(filename)
    if (filename === './') {
      filename = './index.html'
    }

    if (filename.includes('/update/')) {
      handling.handleUpdate(filename, res)
    } else if (filename.includes('/request/')) {
      handling.handleInitialRequest(filename, res)
    } else {
      handling.handleFileRequest(filename, res)
    }
  })
  .listen(8080)
