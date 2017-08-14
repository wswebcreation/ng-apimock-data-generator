'use strict';

const _ = require('lodash');

module.exports = (sourceData) => {
    const validationErrors = [];

    sourceData.forEach((sourceFile) => {
        let errors;

        if (sourceFile.content.mockDataFiles) {
            sourceFile.content.mockDataFiles.forEach((mockFile) => {
                errors = validateAgainstNgapimockTemplate(mockFile, sourceFile.fileName);
                if (errors) {
                    validationErrors.push(errors);
                }
            });
        } else {
            errors = validateAgainstNgapimockTemplate(sourceFile.content, sourceFile.fileName);
            if (errors) {
                validationErrors.push(errors);
            }
        }
    });

    /* istanbul ignore else*/
    if (!_.isEmpty(validationErrors)) {
        throw Error(validationErrors.join('\n'));
    }

    /**
     * Validate the mockdata against the minimal data that ng-Apimock needs
     *
     * @param {Object} mockFile to validate
     * @param {string} sourceFileName name of the sourceFile of which the mockdata is validated
     * @return {string} a string of validation messages
     */
    function validateAgainstNgapimockTemplate(mockFile, sourceFileName) {
        const ngApimockValidationTemplate = {
            fileName: 'string',
            expression: 'string',
            method: 'GET|POST|PUT|DELETE',
            isArray: 'boolean',
            responses: 'object'
        };
        const validationMessages = [];

        for (const key in ngApimockValidationTemplate) {
            if (key !== 'method' && (mockFile[key] === undefined || typeof mockFile[key] !== ngApimockValidationTemplate[key])) {
                validationMessages.push(`No (valid) '${key}' is provided in file '${sourceFileName}'.`);
            }
        }

        if (mockFile.method === undefined || !ngApimockValidationTemplate.method.includes(mockFile.method)) {
            validationMessages.push(`No (valid) 'method' is provided, it should hold one of these [${ngApimockValidationTemplate.method}] in file '${sourceFileName}'.`);
        }

        return _.isEmpty(validationMessages) ? '' : validationMessages.join('\n');
    }
};