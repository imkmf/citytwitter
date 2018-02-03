"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var template_1 = require("./template");
var compileHtml = function (data) { return template_1.default(data); };
var validateJson = function (data) {
    console.log("Validated JSON for " + data.city + ".");
    return data;
};
var pipeline = function (data) {
    console.log("Trying to compile HTML for " + data.city + ".");
    var compiled = compileHtml(data);
    console.log("Successfully compiled HTML for " + data.city + ".");
    writeToFile('dist/index.html', compiled);
    return compiled;
};
var writeToFile = function (filename, data) {
    return new Promise(function (resolve, reject) {
        fs_1.writeFile(filename, data, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
var parseFile = function (filename, callback) {
    return new Promise(function (resolve, reject) {
        fs_1.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                var city = JSON.parse(data);
                var validated = validateJson(city);
                resolve(callback(validated));
            }
        });
    });
};
parseFile('examples/losangeles-short.json', pipeline)
    .then(function (_) { return console.log('Successfully ran citytwitter. Woo!'); })
    .catch(function (err) { throw err; });
//# sourceMappingURL=citytwitter.js.map