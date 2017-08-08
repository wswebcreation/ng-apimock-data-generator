'use strict';

const _ = require('lodash');
const ngApimockValidationTemplate = {
    fileName: 'string',
    expression: 'string',
    method: 'GET|POST|PUT|DELETE',
    name: 'string',
    isArray: 'boolean',
    responses: 'object'
};

module.exports = (sourceData) => {
    const errorMessages = [];

    sourceData.forEach((sourceFile) => {
        if (sourceFile.content.dataTemplate === undefined && sourceFile.content.dataTemplates === undefined) {
            errorMessages.push(`No default template(s) properties defined in file '${sourceFile.fileName}'.`);
        }

        if (sourceFile.content.headersTemplate === undefined && sourceFile.content.headersTemplates === undefined) {
            errorMessages.push(`No default headers template(s) properties defined in file '${sourceFile.fileName}'.`);
        }

        if (sourceFile.content.mockFiles === undefined) {
            errorMessages.push(`No mock files provided in file '${sourceFile.fileName}'.`);
        } else {
            sourceFile.content.mockFiles.forEach((mockFile) => {
                for (const key in ngApimockValidationTemplate) {
                    if (key !== 'method' && (mockFile[key] === undefined || typeof mockFile[key] !== ngApimockValidationTemplate[key])) {
                        errorMessages.push(`No (valid) '${key}' is provided in file '${sourceFile.fileName}'.`);
                    }
                }

                if (mockFile.method === undefined || !ngApimockValidationTemplate.method.includes(mockFile.method)) {
                    errorMessages.push(`No (valid) 'method' is provided, it should hold one of these [${ngApimockValidationTemplate.method}] in file '${sourceFile.fileName}'.`);
                }
            });
        }
    });

    /* istanbul ignore else*/
    if (!_.isEmpty(errorMessages)) {
        throw Error(errorMessages.join('\n'));
    }
};