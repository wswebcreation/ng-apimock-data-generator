const fs = require('fs-extra');
const path = require('path');
const parsers = require('../src/parsers');
const jsonData = fs.readJsonSync(path.resolve(process.cwd(), 'test/testdata/parsers.json'));

describe('parsers', () => {
    it('should parse a minimal mockfile', () => {
        expect(parsers(jsonData.minimalMockData)).toEqual(jsonData.minimalMockData.expected);
    });

    it('should parse a minimal scenario mockfile', () => {
        expect(parsers(jsonData.minimalScenarioMockData)).toEqual(jsonData.minimalScenarioMockData.expected);
    });

    it('should parse a mockfile with own provided headers and data', () => {
        expect(parsers(jsonData.ownDataAndHeadersMockData)).toEqual(jsonData.ownDataAndHeadersMockData.expected);
    });

    it('should parse a mockfile when using a dataTemplate and a headersTemplate', () => {
        expect(parsers(jsonData.dataAndHeadersTemplatesMockData))
            .toEqual(jsonData.dataAndHeadersTemplatesMockData.expected);
    });

    it('should parse a mockfile when using a dataTemplate and a headersTemplate and overwrite data and headers', () => {
        expect(parsers(jsonData.overwriteDataAndHeadersTemplatesMockData))
            .toEqual(jsonData.overwriteDataAndHeadersTemplatesMockData.expected);
    });

    it('should parse a mockfile when using a isArray is true', () => {
        expect(parsers(jsonData.dataArrayMockData))
            .toEqual(jsonData.dataArrayMockData.expected);
    });

    it(`should parse a mockfile when using multiple scenario's`, () => {
        expect(parsers(jsonData.multipleScenarioMockData))
            .toEqual(jsonData.multipleScenarioMockData.expected);
    });

    it(`should parse mulitple mockfiles when using the mockFiles array`, () => {
        expect(parsers(jsonData.multipleMockDataFiles))
            .toEqual(jsonData.multipleMockDataFiles.expected);
    });
});