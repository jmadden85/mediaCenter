'use strict';
var fs = require('fs');
var _ = require('underscore');

var getDirectories = function (path, callback) {
  //Set a default path
  var path = path || process.cwd;
  //Get directory contents
  fs.readdir(path, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      //create a variable for filtering out only directories & one for callback tracking
      var directories = [];
      var time =files.length;

      //Loop through files and get stats object
      files.forEach(function(file, index, array) {

        fs.stat(path + file, function (err, stats) {
          if (err) {
            console.log(err);
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


getDirectories('../', function (data) {
  console.log(data);
});