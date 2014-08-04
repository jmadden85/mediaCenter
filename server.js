'use strict';
var fs = require('fs');
var _ = require('underscore');

fs.readdir('../', function (err, files) {
  var directories;
  if (err) {
    console.log(err);
  } else {
    var directories =files.filter(function(file) {
      var isDirectory = fs.stat('../' + file,
        function (err, stats) {
          if (err) {
            console.log(err);
          } else {
            return stats.isDirectory();
          }
        }
      );
    });
  }
});