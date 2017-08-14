'use strict';

const path = require('path');
const collectSourceFiles = require('./collect-files');
const generateJsonFiles = require('./generate-json-files');
const parseSourceFiles = require('./parsers');
const validateSourceData = require('./validate');

module.exports = (options) => {
    if (!options.templateDir) {
        throw Error('No (valid) template folder has been provided!');
    }

    if (!options.outputFolder) {
        throw Error('No (valid) output folder has been provided!');
    }

    const templateFolder = path.resolve(process.cwd(), options.templateDir);
    const outputFolder = path.resolve(process.cwd(), options.outputFolder);
    const mockingData = {};

    mockingData.sourceData = collectSourceFiles(templateFolder);

    validateSourceData(mockingData.sourceData);

    mockingData.parsedSourceFile = mockingData.sourceData
        .map(parseSourceFiles)
        .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

    generateJsonFiles(outputFolder, mockingData.parsedSourceFile);
};
