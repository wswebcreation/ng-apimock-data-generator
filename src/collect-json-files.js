'use strict';

const fs = require('fs-extra');
const path = require('path');
const isValidJson = require('./is-valid-json');

/**
 * Search a given folder and read all the the JSON files.
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
                const jsonContent = fs.readJsonSync(path.resolve(folder, sourceFile));
                /* istanbul ignore else*/
                if (isValidJson(jsonContent)){
                    return {fileName: sourceFile, content: jsonContent};
                }
            }

            return 'no (valid) json';
        })
        .filter((element) => element !== 'no (valid) json');
};