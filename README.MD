# ng-apimock-data-generator

[![dependencies Status](https://david-dm.org/wswebcreation/ng-apimock-data-generator/status.svg)](https://david-dm.org/wswebcreation/ng-apimock-data-generator) [![Build Status](https://travis-ci.org/wswebcreation/ng-apimock-data-generator.svg?branch=master)](https://travis-ci.org/wswebcreation/ng-apimock-data-generator) [![Coverage Status](https://coveralls.io/repos/github/wswebcreation/ng-apimock-data-generator/badge.svg?branch=master)](https://coveralls.io/github/wswebcreation/ng-apimock-data-generator?branch=master)

[![NPM](https://nodei.co/npm/ng-apimock-data-generator.png)](https://nodei.co/npm/ng-apimock-data-generator/)

> **THIS MODULE IS WORK IN PROGRESS AND STILL IN BETA. IF YOU LIKE TO CONTRIBUTE PLEASE ADD A PR**

> Node plugin that provides the ability to easily generate mockdata files for [ng-Apimock](https://github.com/mdasberg/ng-apimock) based on a JSON or YAML template

When **[ng-Apimock](https://github.com/mdasberg/ng-apimock)** is used multiple mockdata files need to be written to mock API-responses.
This module can generate all those mockfiles out of JSON and or YAML files with the usage of default templates for `responses.data` and `responses.headers` that can ease the writing and prevent repetitive code.

Some core functionalities:

- Multiple different (to be generated) mockdata files can use the default templates for `responses.data` and `responses.headers` when they are generated from 1 single template file
- Default properties can easily be overwritten by providing a new value for the key.
- Templates can be extended in a single `responses.data` or `responses.headers` object by adding a new property.


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
There are 2 ways to write a template for mockfiles, they will both be explained below.

#### Build 1 template mockdata file for multiple API's
If you want to use the strength of this module you can create 1 JSON or YAML template file that hold mockdata for all API's.
Your file should hold a `mockDataFiles`-array with the API's as an object.


```js
// JSON example
{
    "dataTemplates": {}, // will be explained below
    "headersTemplates": {}, // will be explained below
    "mockDataFiles":[
        {
            // API file 1
            "fileName": "name-of-the-first-file-that-needs-to-be-generated",
            // the ng-Apimock-file structure
        },
        {
            // API file 2
            "fileName": "name-of-the-second-file-that-needs-to-be-generated",
            // the ng-Apimock-file structure
        },
        {
            // ...
        }
    ]
}
```

```yaml
# YAML example
dataTemplates: {} # will be explained below
headersTemplates: {} # will be explained below
mockDataFiles:
  # API file 1
  - fileName: name-of-the-first-file-that-needs-to-be-generated
    # the ng-Apimock-file structure
  # API File 2
  - fileName: name-of-the-second-file-that-needs-to-be-generated
    # the ng-Apimock-file structure
```

All the API files can reuse the `dataTemplates` and or `headersTemplates` with a single property reference, see **data/headers templates**

#### Build a template mockdata file for each single API
When you want to have 1 template per API you can use the below structure

```js
// JSON example
{
    "dataTemplates": {}, // will be explained below
    "headersTemplates": {}, // will be explained below
    "fileName": "name-of-the-file-that-needs-to-be-generated",
    // the ng-Apimock-file structure
}
```

```yaml
# YAML example
dataTemplates: {} # will be explained below
headersTemplates: {} # will be explained below
fileName: name-of-the-file-that-needs-to-be-generated
# the ng-Apimock-file structure
```

#### `data/headers` templates
Each file can have an optional `dataTemplates` or `headersTemplates` object. These objects can hold multiple predefined `data` and `headers`.  The template can prevent double code.

**`data/headers`-example**

In the JSON that is used by ng-Apimock you can have for example a response header-object that will be used by all API responses (or a subset of it).
In the below example `headers` are used but it works the same for `data`.

```js
"headers": {
    "Access-Control-Allow-Credentials":true,
    "Access-Control-Allow-Origin": "https://www.example.com",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Date": "Mon, 14 Aug 2017 08:42:49 GMT"
}
```

You can easily make a template out of this like for example this

```js
"headersTemplates": {
    "default:"{
        "Access-Control-Allow-Credentials":true,
        "Access-Control-Allow-Origin": "https://www.example.com",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Date": "%%today%%" // Use a global for the data, see ng-Apimock readme for more info about globals
    }
}
```

And refer to it in the mockdata with a single property like this

```js
{
    // ...
    responses: {
        headers: {
            "ng-apimock-headersTemplate": "default" // refer to the default headers template from above
            // Or overwrite the "Content-Type" from "application/json" to
            "Content-Type": "application/pdf",
            // Or add a new property
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
    }
}
```

You can refer to a template from within the `data`- or `header`-key with the following properties

```js
// For data
"ng-apimock-dataTemplate": "name-of-the-data-template-key"

// For headers
"ng-apimock-headersTemplate": "name-of-the-headers-template-key"
```

`dataTemplates` or `headersTemplates` can be overwritten or extended.

- You can overwrite them by referring to the property and give it a new value.
- You can extend them by adding a new property to the object

For more info and examples please check the [JSON](./docs/JSON.MD) or the [YAML](./docs/YAML.MD) docs


#### `ng-Apimock`-file structure
The structure of a ng-Apimock-file can be found on [ng-Apimock - How to write a mock file](https://github.com/mdasberg/ng-apimock#howto-write-mocks).

The difference with the mockfile from **ng-Apimock** is that the following property needs to be provided

`"fileName": "name-of-the-file"`

This property represents the name of the file that needs to be generated. No extension is needed.

> **If this property is not provided generating mockdata will fail.**

## Changelog
The Changelog can be found [here](./CHANGELOG.md)

## Contributing
How to contribute can be found [here](./docs/CONTRIBUTING.md)