const isValidJson = require('../src/is-valid-json');

describe('is-valid-json', () => {

    describe('string', () => {
        it('should validate an empty object as true', () => {
            expect(isValidJson('{}')).toEqual(true);
        });

        it('should validate an object as true', () => {
            expect(isValidJson('{"some": "thing"}')).toEqual(true);
            expect(isValidJson('{"some": {"thing": 1234}}')).toEqual(true);
        });

        it('should validate an invalid object as false', () => {
            expect(isValidJson('{"@nother": "thing}')).toEqual(false);
        });
    });

    describe('other', () => {
        it('should validate an empty object as true', () => {
            expect(isValidJson({})).toEqual(true);
        });

        it('should validate an object as true', () => {
            expect(isValidJson({"some": "thing"})).toEqual(true);
            expect(isValidJson({some: {thing: 1234}})).toEqual(true);
        });

        it('should validate an invalid object as false', () => {
            expect(isValidJson(undefined)).toEqual(false);
        });
    });
});