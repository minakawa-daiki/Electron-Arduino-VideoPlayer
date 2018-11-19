// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialPort = require('serialport');
const fs = require('fs');
const path = require('path');

const videoList = document.getElementById("video-list");
const player = document.getElementById("my-player");

serialPort.list((err, ports) => {
    ports.forEach((port) => {
      if (port.manufacturer === 'Arduino (www.arduino.cc)') {
        const sp = new serialPort(port.comName, {
          baudrate: 9600
        });
        sp.on('data', function(res) {
            if(res.toString() === "play") {
                player.currentTime = 0;
            }
        });
      }
    });
  });

fs.readdir(path.join(__dirname, 'videos'), function(err, files){
    if (err) throw err;
    files.forEach(file => {
        if(file !== ".keep") {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(file));
            li.addEventListener("click", () => { player.src = "./videos/" + file; });
            li.style = "cursor: pointer; margin: 4px 0;"
            videoList.appendChild(li);
        }
    });
});
