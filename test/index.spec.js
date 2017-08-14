const fs = require('fs-extra');
const path = require('path');
const mockingDataGenerator = require('../src/');
const outputFolder = path.resolve(process.cwd(), '.tmp/index/');

describe('index', () => {
    beforeAll(() => {
        fs.removeSync(outputFolder);
    });

    it('should throw an error when no template folder has been provided', () => {
        expect(() => mockingDataGenerator({outputFolder: outputFolder}))
            .toThrow(new Error('No (valid) template folder has been provided!'));
    });

    it('should throw an error when no output folder has been provided', () => {
        expect(() => mockingDataGenerator({templateDir: 'test/testdata/index/'}))
            .toThrow(new Error('No (valid) output folder has been provided!'));
    });

    it('should generate multiple valid mock data files from json, yaml or yml extension', () => {
        mockingDataGenerator({
            templateDir: 'test/testdata/index/',
            outputFolder: outputFolder
        });

        expect(fs.readJsonSync(`${outputFolder}/foo.bar.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/foo.bar.json'));
        expect(fs.readJsonSync(`${outputFolder}/test.mock.data.1.1.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/test.mock.data.1.1.json'));
        expect(fs.readJsonSync(`${outputFolder}/test.mock.data.1.2.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/test.mock.data.1.2.json'));
        expect(fs.readJsonSync(`${outputFolder}/foo.bar.1.yml.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/foo.bar.1.yml.json'));
        expect(fs.readJsonSync(`${outputFolder}/foo.bar.2.yml.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/foo.bar.2.yml.json'));
        expect(fs.readJsonSync(`${outputFolder}/simple.yaml.json`))
            .toEqual(fs.readJsonSync('test/testdata/expected/simple.yaml.json'));
    });
});