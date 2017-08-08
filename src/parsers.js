'use strict';

const _ = require('lodash');

module.exports = (sourceFile) => {
    const dataTemplates = sourceFile.content.dataTemplate || sourceFile.content.dataTemplates;
    const headersTemplates = sourceFile.content.headersTemplate || sourceFile.content.headersTemplates;

    return sourceFile.content.mockFiles.map((sourceMockFile) => {
        const newMockData = {
            fileName: sourceMockFile.fileName,
            expression: sourceMockFile.expression,
            method: sourceMockFile.method,
            name: sourceMockFile.name,
            isArray: sourceMockFile.isArray,
            responses: {}
        };

        for (const scenario in sourceMockFile.responses) {
            const parseOptions = {
                data: dataTemplates,
                isDataArray: newMockData.isArray,
                headers: headersTemplates,
                scenario: sourceMockFile.responses[scenario]
            };

            newMockData.responses[scenario] = parseScenario(parseOptions);
        }

        return newMockData;
    });

    function parseScenario(parseOptions) {
        const scenario = parseOptions.scenario;

        if (parseOptions.isDataArray) {
            scenario.data = scenario.data.map((scenarioData) =>
                parseScenarioKeyTemplate('Data', scenarioData, parseOptions.data)
            );
        } else {
            scenario.data = parseScenarioKeyTemplate('Data', scenario.data, parseOptions.data);
        }

        scenario.headers = parseScenarioKeyTemplate('Headers', scenario.headers, parseOptions.headers);

        return scenario;
    }

    function parseScenarioKeyTemplate(partialKey, scenarioKeyValue, templates) {
        if (scenarioKeyValue[`ng-Apimock${partialKey}Template`]) {
            let scenarioKeyTemplate;

            if (scenarioKeyValue[`ng-Apimock${partialKey}Template`] === 'default') {
                scenarioKeyTemplate = _.cloneDeep(templates);
            } else {
                scenarioKeyTemplate = _.cloneDeep(templates[scenarioKeyValue[`ng-Apimock${partialKey}Template`]]);
            }

            const result = _.merge(scenarioKeyTemplate, scenarioKeyValue);
            delete result[`ng-Apimock${partialKey}Template`];

            return result;
        }

        return scenarioKeyValue;
    }
};