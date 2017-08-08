const fs = require('fs-extra');
const mockingDataGenerator = require('../src/');

describe('index', () => {
    it('should generate multiple valid mock data files', () => {
        mockingDataGenerator({
            templateDir: 'test/testdata/index/',
            outputFolder: '.tmp/'
        });

        expect(fs.readJsonSync('.tmp/foo.bar.json'))
            .toEqual(fs.readJsonSync('test/testdata/expected/foo.bar.json'));
        expect(fs.readJsonSync('.tmp/test.mock.data.1.1.json'))
            .toEqual(fs.readJsonSync('test/testdata/expected/test.mock.data.1.1.json'));
        expect(fs.readJsonSync('.tmp/test.mock.data.1.2.json'))
            .toEqual(fs.readJsonSync('test/testdata/expected/test.mock.data.1.2.json'));
    });
});