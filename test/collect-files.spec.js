const fs = require('fs-extra');
const path = require('path');
const collectJsonSourceFiles = require('../src/collect-files');
const collectFilesFolder = path.resolve(process.cwd(), 'test/testdata/collect-files/');

describe('collect-files', () => {
    it('should collect only JSON, YML and YAML files and merge them into 1 output', () => {
        expect(collectJsonSourceFiles(collectFilesFolder))
            .toEqual(fs.readJsonSync('test/testdata/expected/collect-files.json'));
    });
});