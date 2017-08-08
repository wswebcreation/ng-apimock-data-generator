'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = (outputFolder, mockFiles) => {
    mockFiles.forEach((mockData) => {
        const filePath = path.resolve(outputFolder, `${mockData.fileName}.json`);

        fs.ensureFileSync(filePath);
        delete mockData.fileName;

        fs.writeJsonSync(filePath, mockData, {spaces: 2});
    });
};