/*
 * Library for storing and editing data
 *
 */

// Dependencies
var fs = require("fs");
var path = require("path");

// Container for the module (to be exported)
var lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, "/../.data/");

// Write data to a file
lib.create = function (dir, file, data, callback) {
  //open the file wor writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "wx",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // Convert data to string
        var stringData = JSON.stringify(data);

        // Write to file and close it
        fs.writeFile(fileDescriptor, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else callback("Error closing new file");
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("could not create new file it may already exist");
      }
    }
  );
};

// Read data from a file
lib.read = function (dir, file, callback) {
  fs.readFile(
    lib.baseDir + dir + "/" + file + ".json",
    "utf-8",
    function (err, data) {
      callback(err, data);
    }
  );
};

// Export the module
module.exports = lib;
