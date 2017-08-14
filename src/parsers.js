'use strict';

const _ = require('lodash');

module.exports = (sourceFile) => {
    const dataTemplates = sourceFile.content.dataTemplates || {};
    const headersTemplates = sourceFile.content.headersTemplates || {};

    return sourceFile.content.mockDataFiles ? sourceFile.content.mockDataFiles.map(parseMockFile) : parseMockFile(sourceFile.content);

    function parseMockFile(mockFile) {
        const newMockData = {
            fileName: mockFile.fileName,
            expression: mockFile.expression,
            method: mockFile.method,
            name: mockFile.name || '',
            isArray: mockFile.isArray,
            responses: {}
        };

        for (const scenario in mockFile.responses) {
            const parseOptions = {
                data: dataTemplates,
                headers: headersTemplates,
                isDataArray: newMockData.isArray,
                scenario: mockFile.responses[scenario]
            };

            newMockData.responses[scenario] = parseScenario(parseOptions);
        }

        /* istanbul ignore else */
        if (newMockData.name === '') {
            delete newMockData.name;
        }

        return newMockData;
    }


    function parseScenario(parseOptions) {
        const scenario = parseOptions.scenario;

        if (parseOptions.isDataArray && scenario.data) {
            scenario.data = scenario.data.map((scenarioData) =>
                parseScenarioKeyTemplate('data', scenarioData, parseOptions.data)
            );
        } else if (scenario.data) {
            scenario.data = parseScenarioKeyTemplate('data', scenario.data, parseOptions.data);
        }

        if (scenario.headers) {
            scenario.headers = parseScenarioKeyTemplate('headers', scenario.headers, parseOptions.headers);
        }

        return scenario;
    }

    function parseScenarioKeyTemplate(partialKey, scenarioKeyValue, templates) {
        if (scenarioKeyValue[`ng-apimock-${partialKey}Template`]) {
            const scenarioKeyTemplate = _.cloneDeep(templates[scenarioKeyValue[`ng-apimock-${partialKey}Template`]]);
            const result = _.merge(scenarioKeyTemplate, scenarioKeyValue);
            delete result[`ng-apimock-${partialKey}Template`];

            return result;
        }

        return scenarioKeyValue;
    }
};