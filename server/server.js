'use strict';
var fs = require('fs');
var http = require('http');

var getDirectories = function (path, callback) {
  //Set a default path
  var path = path || process.cwd;
  //Get directory contents
  fs.readdir(path, function (err, files) {
    if (err) {
      throw err;
    } else {
      //create a variable for filtering out only directories & one for callback tracking
      var directories = [];
      var time = files.length;

      //Loop through files and get stats object
      files.forEach(function (file, index, array) {

        fs.stat(path + file, function (err, stats) {
          if (err) {
            throw err;
          } else {
            //check if it's directory and push to directories array
            stats.isDirectory() ? directories.push(file) : false;
            if (time-- === 1) {
              //Done iterating, return the data
              callback(directories);
            }
          }
        });
      });//end files loop
    }
  });
};

var fileBrowser = {
  //gets contents of a directory
  getContents: function (path, callback) {
    fs.readdir(path, function (err, files) {
      if (err) {
        throw err;
      }
      //Filter for filtering out unneeded files
      var filteredFiles = files.filter(function (file) {
        var filter = /^\./;
        (!filter.test(file))
        return (!filter.test(file));
        // return file !== '.DS_Store';
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
        if (err) {
          throw err;
        }
        stats.isDirectory() ? directories.push(file) : files.push(file);
        if (loops === index) {
          options.type === 'directories' ? callback(directories) : callback(files);
        }
      });
    });
  }
};

fileBrowser.getContents('./', function (data) {
  fileBrowser.getDirectoriesOrFiles({
    path: './',
    files: data,
    type: 'files'
  }, function (data) {
    console.log(data);
  });
});