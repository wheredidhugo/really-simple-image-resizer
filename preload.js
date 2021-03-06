const fs = require("fs");
const sharp = require("sharp");
const resize = require("sharp/lib/resize");
const path = require("path");
const homedir = require("os").homedir();

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("button").onclick = function () {
    var dir;
    var dirOutput;

    function resize(file) {
      sharp(dir + file)
        .metadata()
        .then(function (metadata) {
          var width = metadata.width;
          var height = metadata.height;
          if (width > height) {
            sharp(dir + file)
              .resize(vWidth, vHeight)
              .toFile(dirOutput + file);
          } else {
            sharp(dir + file)
              .resize(vHeight, vWidth)
              .toFile(dirOutput + file);
          };
        });
    };

    var vWidth = parseInt(document.getElementById("vWidth").value);
    var vHeight = parseInt(document.getElementById("vHeight").value);

    if (process.platform === "darwin") {
      dir = path.join(__dirname + "../../../../../pics/");
      dirOutput = path.join(__dirname + "../../../../../output/");
    } else if (process.platform === "win32") {
      dir = path.join(__dirname + "/pics/");
      dirOutput = path.join(__dirname + "/output/");
      // If you want to get your folders that are on the desktop then uncomment the next two lines and comment the last two lines
      // dir = path.join(homedir + "/Desktop/pics/");
      // dirOutput = path.join(homedir + "/Desktop/output/");
    };

    fs.readdir(dir, (err, files) => {
      if (err) {
        throw err;
      };

      files.forEach((file) => {
        resize(file);
      });
    });
  };
});
