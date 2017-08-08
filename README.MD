# ng-apimock-data-generator

> **!!NO MODULE HADE BEEN CREATED YET, THIS IS ONLY A PLAYGROUND!!**

> Node plugin that provides the ability to easily generate multiple mockdata files for [ng-Apimock](https://github.com/mdasberg/ng-apimock) based on a single file

When **ng-Apimock** is used multiple mockdata files need to be written to mimic API-responses.
This module can generate all those mockfiles out of 1 JSON file with the usage of default templates for `responses.data` and `responses.headers` to ease the writing an repetitive JSON-code.
Default properties can easily be overwritten by providing a new value for the key. Templates can be extended in a single `responses.data` or `responses.headers` object by adding a new property.
This module can also be used to create a template mockfile for each API and make usage of the `responses.data` and or `responses.headers`-templates to ease writing mockdata.
See the examples below how to use it.

## Getting started

```shell
npm install ng-apimock-data-generator --save-dev
```

### Usage

```js
const mockDataGenerator = require('ng-apimock-data-generator');

mockDataGenerator({
    templateDir: 'path/which/holds/files/',
    outputFolder: 'path/to/save/single-files-to/'
});
```

### Writing template mock-files
Below you will find some examples about how to create a template mockfile. The following keys are mandatory.

```js
{
    "dataTemplate": {..}, // OR
    "dataTemplates": ["foo":{..}, "bar":{..}],
    "headersTemplate": {..}, // OR
    "headersTemplates": ["foo":{..}, "bar":{..}],
    "mockFiles":[
        {
            "fileName": "name-of-the-file"",
            // the ng-Apimock-file structure
        }
    ]
}
```

#### Example file

```js
{
  "dataTemplate": {
    "number": 1234567890
  },
  "headersTemplate": {
    "Access-Control-Allow-Credentials": true,
    "Content-type": "application/json"
  },
  "mockFiles": [
    {
      "fileName": "name-of-the-file",
      "expression": "your expression here (ie a regex without the leading and trailing '/' or a string)",
      "method": "the http method (ie GET, POST, PUT or DELETE)", // supports JSONP as well
      "name": "identifiable name for this service call"  // if non is provided, expression$$method will be used
      "isArray": "indicates if the response data is an array or object",
      "responses": {
        "some-meaningful-scenario-name": {
          "default": true, // if false or not provided this response will not be used as default
          "status": 200, // optional - defaults to 200
          "headers": {}, // optional - defaults to {}
          "data": {}, // optional
          "file": "path/to/file.ext" // optional, when provided don't forget the matching content-type header as it will result in a file download instead of data
          "statusText": "", // optional
          "delay": 2000 // optional - defaults to no delay when provided this delay will only be used for this response
        },
        "some-other-meaningful-scenario-name": {
          "data": {}
        }
      }
    },
    {
      "fileName": "file-2",
      "expression": "...",
      "method": "...",
      "name": "...",
      "responses": {}
    }
  ]
}
```

#### `mockFiles`
`mockFiles` is an Array of objects that will hold the files that need to be generated. Each object represents 1 file that should be equal to a mockfile that can be found on [ng-Apimock - How to write a mock file](https://github.com/mdasberg/ng-apimock#howto-write-mocks).

The difference with the mockfile from ng-Apimock is that the following property needs to be provided

`"fileName": "name-of-the-file"`

This property represents the name of the file that needs to be generated. No extension is needed.

#### `data/headers` templates
Each file needs to have a `data/headers`-Template. `data` and `headers` can refer to a template which will prevent double code. The templates can be a default template or an Array of templates from which you can choose.

> **If a `data/headers`-template is not provided the files can't be generated and an error will be thrown**

You can refer to a template from within the `data`- or `header`-key with the following properties

```js
// For data
"ng-ApimockDataTemplate": ".."

// For headers
"ng-ApimockHeadersTemplate": ".."
```

See the examples below for the implementation.

#### Example with default (data/headers)Template
```js
{
  "dataTemplate": {
    "number": 1234567890
  },
  "headersTemplates": {
    "1": {
      "Access-Control-Allow-Methods": "PUT",
      "Content-type": "application/json"
    },
    "2": {
      "Access-Control-Allow-Origin": "https://www.foo.bar",
      "Content-type": "application/pdf"
    }
  },
  "mockFiles": [
    {
      "fileName": "test.mock.data.1.1",
      "expression": "test.1.1",
      "method": "GET",
      "name": "test1.1",
      "isArray": true,
      "responses": {
        "test-scenario-1.1.1": {
          "default": true,
          "status": 200,
          "data": [
            {
              "ng-ApimockDataTemplate": "default"
            }
          ],
          "headers": {
            "ng-ApimockHeadersTemplate": "default"
          }
        }
      }
    }
  ]
}
```

#### Example with (data/headers)Templates
```js
{
  "dataTemplates": {
    "string": {
      "string": "foo && bar"
    },
    "number": {
      "number": 12324
    }
  },
  "headersTemplates": {
    "1": {
      "Access-Control-Allow-Methods": "PUT",
      "Content-type": "application/json"
    },
    "2": {
      "Access-Control-Allow-Origin": "https://www.foo.bar",
      "Content-type": "application/pdf"
    }
  },
  "mockFiles": [
    {
      "fileName": "foo.bar",
      "expression": "foo.bar.foo",
      "method": "PUT",
      "name": "foo.foo",
      "isArray": true,
      "responses": {
        "foo": {
          "default": true,
          "status": 200,
          "data": [
            {
              "ng-ApimockDataTemplate": "number"
            }
          ],
          "headers": {
            "ng-ApimockHeadersTemplate": "1"
          }
        }
      }
    }
  ]
}
```