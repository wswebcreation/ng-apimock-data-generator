'use strict';

const path = require('path');
const collectJsonSourceFiles = require('./collect-json-files');
const generateJsonFile = require('./generate-json-files');
const parseSourceFiles = require('./parsers');
const validateSourceData = require('./validate');

module.exports = (options) => {
    const templateFolder = path.resolve(process.cwd(), options.templateDir);
    const outputFolder = path.resolve(process.cwd(), options.outputFolder);
    const mockingData = {};

    // Read and collect all file data
    mockingData.sourceData = collectJsonSourceFiles(templateFolder);

    // validate the data
    validateSourceData(mockingData.sourceData);

    // Parse the data
    mockingData.parsedSourceFile = mockingData.sourceData
        .map(parseSourceFiles)
        .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);

    // Generate new files
    generateJsonFile(outputFolder, mockingData.parsedSourceFile);
};
