'use strict';
var fs = require('fs');

var fileBrowser = {
  //gets contents of a directory
  getContents: function (path, callback) {
    fs.readdir(path, function (err, files) {
      if (err) throw err;
      //Filter for filtering out unneeded files
      var filteredFiles = files.filter(function (file) {
        return file !== '.DS_Store';
      });
      callback(filteredFiles);
    });
  },
  //gets directories or files in a directory
  getDirectoriesOrFiles: function (options, callback) {
    var directories = [];
    var files = [];
    var loops = options.files.length - 1;
    options.files.forEach(function (file, index) {
      fs.stat(options.path + file, function (err, stats) {
        if (err) throw err;
        stats.isDirectory() ? directories.push(file) : files.push(file);
        if (loops === index) {
          options.type === 'directories' ? callback(directories) : callback(files);
        }
      });
    });
  }
};

fileBrowser.getContents('../', function (data) {
  fileBrowser.getDirectoriesOrFiles({
    path: '../',
    files: data,
    type: 'directories'
  }, function (data) {
    console.log(data);
  });
});