const fs = require("fs");
/**
 *
 * @param {string} pdfPath
 */
module.exports = function (pdfPath) {
    const fs = require('fs');
    const PDFParser = require('pdf2json');

    if (fs.existsSync(pdfPath)) {
        const pdfParser = new PDFParser(this, 1);
        pdfParser.on('pdfParser_dataError', error => console.log(error));
        pdfParser.on('pdfParser_dataReady', pdf => {

            console.log(pdfParser.getRawTextContent());

        });
        pdfParser.loadPDF(pdfPath);
    }
}
