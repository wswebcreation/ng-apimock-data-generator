const fs = require('fs-extra');
const path = require('path');
const collectJsonSourceFiles = require('../src/collect-json-files');
const jsonFolder = path.resolve(process.cwd(), 'test/testdata/collect-json-files/');

describe('collect-json-files', () => {
    it('should collect only JSON files and merge them into 1 output', () => {
        expect(collectJsonSourceFiles(jsonFolder))
            .toEqual(fs.readJsonSync('test/testdata/expected/collect-json-files.json'));
    });
});