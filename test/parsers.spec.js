const fs = require('fs-extra');
const path = require('path');
const parsers = require('../src/parsers');
const jsonData = fs.readJsonSync(path.resolve(process.cwd(), 'test/testdata/parsers.json'));

describe('parsers', () => {
    it('should parse a single mockfile with no data and own provided headers', () => {
        expect(parsers(jsonData.singleMockData)).toEqual(jsonData.singleMockData.expected);
    });

    it('should parse multiple mockfiles with default data and default headers', () => {
        expect(parsers(jsonData.singleMockData)).toEqual(jsonData.singleMockData.expected);
    });
});