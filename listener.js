const chokidar = require('chokidar');
const {WatchOptions} = require("chokidar");
const pdfReader = require("./pdfReader");

const basePath = require('./config.json').path;

/** @type {WatchOptions} */
const options = {
    // ignoreInitial: true,
}

chokidar.watch(basePath, options).on('all', (event, filePath) => {
    const fileName = getFileNameFromPath(filePath);
    const fileExtension = getFileExtension(fileName);
    switch (event) {
        case "add":
            console.log(fileName + ' was added.');
            if (fileExtension === 'pdf') {
                pdfReader(filePath);
            }
            break;
        case "unlink":
            console.log(fileName + ' was removed.');
            break;
        case "change":
            console.log(fileName + ' was changed.');
            break;
    }
});

/**
 *
 * @param {string} path
 * @return string
 */
function getFileNameFromPath(path) {
    const pathParts = path.split(/\\/);
    return pathParts[pathParts.length - 1];
}

/**
 *
 * @param {string} fileName
 */
function getFileExtension(fileName) {
    const fileParts = fileName.split(/\./);
    return fileParts[fileParts.length - 1];
}

