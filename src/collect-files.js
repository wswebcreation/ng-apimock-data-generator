'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Search a given folder and read all the the JSON / YAML files.
 *
 * @return {Array}
 *
 * @example
 *
 * <pre>
 *     [
 *       {fileName: "example1.json", content: {"foo": "bar"},
 *       {fileName: "example2.json", content: {"foobar": "bar foo"}
 *     ]
 * </pre>
 */
module.exports = (folder) => {
    return fs.readdirSync(folder)
        .map((sourceFile) => {
            if (path.extname(sourceFile) === '.json') {
                try {
                    const jsonContent = fs.readJsonSync(path.resolve(folder, sourceFile));
                    return {
                        fileName: sourceFile,
                        content: jsonContent
                    };
                } catch (error){
                    console.warn(`\nJSON file ${sourceFile} could not be parsed, see: ${error}\n`);
                }
            }

            if (['.yml', '.yaml'].includes(path.extname(sourceFile))) {
                try {
                    const yamlContent = yaml.safeLoad(fs.readFileSync(path.resolve(folder, sourceFile), 'utf8'));
                    return {
                        fileName: sourceFile,
                        content: yamlContent
                    };
                } catch (error) {
                    console.warn(`\nYAML file ${sourceFile} could not be parsed, see: ${error}\n`);
                }
            }

            return 'no (valid) file';
        })
        .filter((element) => element !== 'no (valid) file');
};