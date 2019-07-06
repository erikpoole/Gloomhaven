const fs = require('fs')

const readJSONFromFile = function (filename) {
  let data = fs.readFileSync(filename)
  return JSON.parse(data.toString())
}

exports.handleUpdate = function (filename, res) {
  let request = filename.split('/update/')[1]
  let name = request.split('=')[0]
  let count = request.split('=')[1]

  let parameters = readJSONFromFile('./data.json')
  parameters[name] = count

  fs.writeFileSync('./data.json', JSON.stringify(parameters), function (err) {
    if (err) {
      throw err
    }
  })

  console.log('Received: ' + request)
  res.writeHead(200)
  res.end()
}

exports.handleInitialRequest = function (filename, res) {
  let request = filename.split('/request/')[1]

  let returnValue = 'ERROR'
  let parameters = readJSONFromFile('./data.json')
  returnValue = parameters[request]

  console.log('Sent value for: ' + request)
  res.writeHead(200)
  res.write(returnValue.toString())
  res.end()
}

exports.handleFileRequest = function (filename, res) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      console.log('Failed')
      res.end('404 Not Found')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      console.log('Sent: ' + filename)
      res.end()
    }
  })
}
// exports.handleFileRequest = function (filename, res) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(filename, (err, data) => {
//       err ? reject(err) : resolve(data)
//     })
//   })
//   .then((data) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     res.write(data)
//     console.log('Sent: ' + filename)
//     res.end()
//   })
//   .catch((err) =>)
//   fs.readFile(filename, function (err, data) {
//     if (err) {
//       res.writeHead(404, { 'Content-Type': 'text/html' })
//       console.log('Failed')
//       res.end('404 Not Found')
//     }
//     }
//   })
// }
// function getData(fileName, type) {
//   return new Promise(function(resolve, reject){
//     fs.readFile(fileName, type, (err, data) => {
//         err ? reject(err) : resolve(data);
//     });
//   });
// }
