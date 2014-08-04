'use strict';
var fs = require('fs');
var _ = require('underscore');

var getDirectories = function (path, callback) {
  var path = path || '../';
  fs.readdir(path, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      var directories = [];
      var time =files.length;

      files.forEach(function(file, index, array) {
        fs.stat(path + file, function (err, stats){
          if (err) {
            console.log(err);
          } else {
            stats.isDirectory() ? directories.push(file) : false;
            if (time-- === 1) {
              callback(directories);
            }
          }
        });
      });
    }
  });
};


getDirectories('../', function (data) {
  console.log(data);
});