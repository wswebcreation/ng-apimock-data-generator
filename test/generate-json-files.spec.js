const fs = require('fs-extra');
const path = require('path');
const generateJsonFile = require('../src/generate-json-files');
const outputFolder = path.resolve(process.cwd(), '.tmp/generate-json-files/');
const jsonData = fs.readJsonSync(path.resolve(process.cwd(), 'test/testdata/generate-json-files.json'));

describe('generate-json-files', () => {
    it('should generate multiple json files out of 1 json file', () => {
        generateJsonFile(outputFolder, jsonData);

        expect(fs.readJsonSync(`${outputFolder}/some.thing.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/some.thing.json'));
        expect(fs.readJsonSync(`${outputFolder}/another.thing.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/another.thing.json'));
        expect(fs.readJsonSync(`${outputFolder}/some.thing.else.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/some.thing.else.json'));
    });
});