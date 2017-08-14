const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const validateSourceData = require('../src/validate');
const jsonData = fs.readJsonSync(path.resolve(process.cwd(), 'test/testdata/error.json'));
const validSourceData = jsonData.validSourceData.sourceData;

describe('Validate source data', () => {
    describe('with mockDataFiles', () => {
        it('should throw an error when no fileName is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[0].content.mockDataFiles[0].fileName;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'fileName' is provided in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no valid fileName is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[0].content.mockDataFiles[0].fileName = 1234;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'fileName' is provided in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no expression is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[0].content.mockDataFiles[0].expression;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'expression' is provided in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no valid expression is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[0].content.mockDataFiles[0].expression = 1234;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'expression' is provided in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no method is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[0].content.mockDataFiles[0].method;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no valid method is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[0].content.mockDataFiles[0].method = 'FOO';

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no isArray is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[0].content.mockDataFiles[0].isArray;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'isArray' is provided in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no valid isArray is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[0].content.mockDataFiles[0].isArray = 'true';

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'isArray' is provided in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no responses object is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[0].content.mockDataFiles[0].responses;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'responses' is provided in file '${json[0].fileName}'.`));
        });

        it('should throw an error when no valid responses object is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[0].content.mockDataFiles[0].responses = 'true';

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'responses' is provided in file '${json[0].fileName}'.`));
        });

        it('should gather all errors and throw multiple errors when all rules are executed', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[0].content.mockDataFiles[0].fileName;
            json[0].content.mockDataFiles[0].expression = 1234;
            json[0].content.mockDataFiles[0].method = 'FOO';
            json[0].content.mockDataFiles[0].isArray = 'true';
            json[0].content.mockDataFiles[0].responses = 'true';

            expect(() => validateSourceData(json))
                .toThrow(new Error("No (valid) 'fileName' is provided in file 'validSourceData.1.json'.\n" +
                    "No (valid) 'expression' is provided in file 'validSourceData.1.json'.\n" +
                    "No (valid) 'isArray' is provided in file 'validSourceData.1.json'.\n" +
                    "No (valid) 'responses' is provided in file 'validSourceData.1.json'.\n" +
                    "No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file 'validSourceData.1.json'."));
        });
    });

    describe('without mockDataFiles', () => {
        it('should throw an error when no fileName is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[1].content.fileName;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'fileName' is provided in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no valid fileName is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[1].content.fileName = 1234;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'fileName' is provided in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no expression is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[1].content.expression;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'expression' is provided in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no valid expression is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[1].content.expression = 1234;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'expression' is provided in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no method is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[1].content.method;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no valid method is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[1].content.method = 'FOO';

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no isArray is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[1].content.isArray;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'isArray' is provided in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no valid isArray is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[1].content.isArray = 'true';

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'isArray' is provided in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no responses object is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[1].content.responses;

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'responses' is provided in file '${json[1].fileName}'.`));
        });

        it('should throw an error when no valid responses object is provided ', () => {
            const json = _.cloneDeep(validSourceData);
            json[1].content.responses = 'true';

            expect(() => validateSourceData(json))
                .toThrow(new Error(`No (valid) 'responses' is provided in file '${json[1].fileName}'.`));
        });

        it('should gather all errors and throw multiple errors when all rules are executed', () => {
            const json = _.cloneDeep(validSourceData);
            delete json[1].content.fileName;
            json[1].content.expression = 1234;
            json[1].content.method = 'FOO';
            json[1].content.name = 1234;
            json[1].content.isArray = 'true';
            json[1].content.responses = 'true';

            expect(() => validateSourceData(json))
                .toThrow(new Error("No (valid) 'fileName' is provided in file 'validSourceData.2.json'.\n" +
                    "No (valid) 'expression' is provided in file 'validSourceData.2.json'.\n" +
                    "No (valid) 'isArray' is provided in file 'validSourceData.2.json'.\n" +
                    "No (valid) 'responses' is provided in file 'validSourceData.2.json'.\n" +
                    "No (valid) 'method' is provided, it should hold one of these [GET|POST|PUT|DELETE] in file 'validSourceData.2.json'."));
        });
    });
});