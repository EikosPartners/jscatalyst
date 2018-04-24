/** 
 * A file to generate the options list of components used in UIBuilder.
 * 
 * run "node compNameGenerator.js directoryName" to generate the output 
 */

let fs = require('fs');

if (process.argv.length < 3) {
    console.error(`Usage: node compNameGenerator.js directory [save name]`);
    process.exit();
}

let path = process.argv[2];

let output = {};

// We'll make an object whose root property is the name of the folder the components
// are being generated from.
let dirName = path.substr(path.lastIndexOf('/') + 1);

// If the user provided an argument for what the directory name should be in the
// output then overwrite dirname.
if (process.argv.length >= 4) {
    dirName = process.argv[3];
}

output[dirName] = [];

fs.readdir(path, (err, files) => {
    files.forEach(file => {
        let value = file.replace('.vue', '');

        let text = value.split(/(?=[A-Z])/).join(' ');

        let obj = {
            text: text,
            value: value
        };

        output[dirName].push(obj);
    });

    console.log(output);
});