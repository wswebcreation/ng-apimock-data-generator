const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const validateSourceData = require('../src/validate');
const jsonData = fs.readJsonSync(path.resolve(process.cwd(), 'test/testdata/error.json'));
const validSourceData = jsonData.validSourceData.sourceData;

describe('Validate source data', () => {

    it('should throw an error when no defaultTemplate(s) are provided ', () => {
        expect(() => validateSourceData(jsonData.noDataTemplates.sourceData))
            .toThrow(new Error(`No default template(s) properties defined in file '${jsonData.noDataTemplates.sourceData[0].fileName}'.`));
    });

    it('should throw an error when no headerTemplate(s) are provided ', () => {
        expect(() => validateSourceData(jsonData.noHeadersTemplates.sourceData))
            .toThrow(new Error(`No default headers template(s) properties defined in file '${jsonData.noHeadersTemplates.sourceData[0].fileName}'.`));
    });

    it('should throw an error when no mock files are provided ', () => {
        expect(() => validateSourceData(jsonData.noMockFiles.sourceData))
            .toThrow(new Error(`No mock files provided in file '${jsonData.noMockFiles.sourceData[0].fileName}'.`));
    });

    it('should throw an error when no fileName is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        delete json[0].content.mockFiles[0].fileName;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'fileName' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no valid fileName is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        json[0].content.mockFiles[0].fileName = 1234;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'fileName' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no expression is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        delete json[0].content.mockFiles[0].expression;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'expression' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no valid expression is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        json[0].content.mockFiles[0].expression = 1234;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'expression' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no method is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        delete json[0].content.mockFiles[0].method;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no valid method is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        json[0].content.mockFiles[0].method = 'FOO';

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no name is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        delete json[0].content.mockFiles[0].name;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'name' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no valid name is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        json[0].content.mockFiles[0].name = 1234;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'name' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no isArray is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        delete json[0].content.mockFiles[0].isArray;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'isArray' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no valid isArray is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        json[0].content.mockFiles[0].isArray = 'true';

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'isArray' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no responses object is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        delete json[0].content.mockFiles[0].responses;

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'responses' is provided in file '${json[0].fileName}'.`));
    });

    it('should throw an error when no valid responses object is provided ', () => {
        const json = _.cloneDeep(validSourceData);
        json[0].content.mockFiles[0].responses = 'true';

        expect(() => validateSourceData(json))
            .toThrow(new Error(`No (valid) 'responses' is provided in file '${json[0].fileName}'.`));
    });

    it('should gather all errors and throw multiple errors when all rules are executed', () => {
        const json = _.cloneDeep(validSourceData);
        delete json[0].content.dataTemplate;
        delete json[0].content.headersTemplate;
        json[0].content.mockFiles[0].expression = 1234;
        json[0].content.mockFiles[0].method = 'FOO';
        json[0].content.mockFiles[0].name = 1234;
        json[0].content.mockFiles[0].isArray = 'true';
        json[0].content.mockFiles[0].responses = 'true';

        expect(() => validateSourceData(json))
            .toThrow(new Error("No default template(s) properties defined in file 'validSourceData.1.json'.\n" +
                "No default headers template(s) properties defined in file 'validSourceData.1.json'.\n" +
                "No (valid) 'expression' is provided in file 'validSourceData.1.json'.\n" +
                "No (valid) 'name' is provided in file 'validSourceData.1.json'.\n" +
                "No (valid) 'isArray' is provided in file 'validSourceData.1.json'.\n" +
                "No (valid) 'responses' is provided in file 'validSourceData.1.json'.\n" +
                "No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file 'validSourceData.1.json'."));
    });
});