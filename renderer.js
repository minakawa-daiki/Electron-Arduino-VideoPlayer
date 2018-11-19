// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialPort = require('serialport');
serialPort.list(function(err, ports) {
  ports.forEach(function(port){
    console.log(port);
  });
});
