# JSON examples

## Example template for multiple mockfiles
Below example template will generate 2 json files because 2 mockDataFiles are defined. This is a very simple example and will look like there will be much code to generate an example, but the advantage will be when you use a lot of repetitive headers or data.

```js
{
  "dataTemplates": {
    "default": {
      "number": 1234567890
    }
  },
  "headersTemplates": {
    "default": {
      "Access-Control-Allow-Credentials": true,
      "Content-type": "application/json"
    }
  },
  "mockDataFiles": [
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
          "data": [],
          "headers": {
            "Access-Control-Allow-Credentials": true,
            "Content-type": "application/json"
          }
        },
        "test-scenario-1.1.2": {
          "status": 200,
          "data": [
            {
              "number": 9876543210
            },
            {
              "ng-apimock-dataTemplate": "default"
            }
          ],
          "headers": {
            "ng-apimock-headersTemplate": "default",
            "Access-Control-Allow-Credentials": false,
            "Access-Control-Allow-Headers": "authorization"
          }
        }
      }
    },
    {
      "fileName": "test.mock.data.1.2",
      "expression": "test.1.2",
      "method": "GET",
      "name": "test1.2",
      "isArray": false,
      "responses": {
        "test-scenario-1.2.1": {
          "default": true,
          "status": 200,
          "data": {
            "some": "thing",
            "another": "thing"
          },
          "headers": {
            "ng-apimock-headersTemplate": "default"
          }
        },
        "test-scenario-1.2.2": {
          "status": 200,
          "data": {
            "number": 1029384756
          },
          "headers": {
            "ng-apimock-headersTemplate": "default"
          }
        },
        "test-scenario-1.2.3": {
          "status": 200,
          "data": {
            "ng-apimock-dataTemplate": "default"
          },
          "headers": {
            "ng-apimock-headersTemplate": "default"
          }
        }
      }
    }
  ]
}
```

This will output 2 files **test.mock.data.1.1.json**

```js
{
  "expression": "test.1.1",
  "method": "GET",
  "name": "test1.1",
  "isArray": true,
  "responses": {
    "test-scenario-1.1.1": {
      "default": true,
      "status": 200,
      "data": [],
      "headers": {
        "Access-Control-Allow-Credentials": true,
        "Content-type": "application/json"
      }
    },
    "test-scenario-1.1.2": {
      "status": 200,
      "data": [
        {
          "number": 9876543210
        },
        {
          "number": 1234567890
        }
      ],
      "headers": {
        "Access-Control-Allow-Credentials": false,
        "Content-type": "application/json",
        "Access-Control-Allow-Headers": "authorization"
      }
    }
  }
}

```

And **test.mock.data.1.2.json**

```js
{
  "expression": "test.1.2",
  "method": "GET",
  "name": "test1.2",
  "isArray": false,
  "responses": {
    "test-scenario-1.2.1": {
      "default": true,
      "status": 200,
      "data": {
        "some": "thing",
        "another": "thing"
      },
      "headers": {
        "Access-Control-Allow-Credentials": true,
        "Content-type": "application/json"
      }
    },
    "test-scenario-1.2.2": {
      "status": 200,
      "data": {
        "number": 1029384756
      },
      "headers": {
        "Access-Control-Allow-Credentials": true,
        "Content-type": "application/json"
      }
    },
    "test-scenario-1.2.3": {
      "status": 200,
      "data": {
        "number": 1234567890
      },
      "headers": {
        "Access-Control-Allow-Credentials": true,
        "Content-type": "application/json"
      }
    }
  }
}
```

## Example template for 1 mockfile

```js
{
  "dataTemplates": {
    "default": {
      "some": {
        "thing": "else"
      },
      "another": "thing"
    },
    "with-globals": {
      "type": 30,
      "typeName": "Thirty",
      "start-event": {
        "timestamp": "%%yesterday%%",
        "text": "Thirty something"
      },
      "end-event": {
        "timestamp": "%%today%%",
        "text": "Thirty something"
      }
    }
  },
  "headersTemplates": {
    "default": {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "https://www.example.com",
      "Connection": "keep-alive",
      "Content-Type": "application/json",
      "Date": "%%today%%"
    }
  },
  "fileName": "single.api.file",
  "expression": "single/api/file",
  "method": "GET",
  "name": "single.api.file",
  "isArray": true,
  "responses": {
    "scenario-1": {
      "default": true,
      "status": 200,
      "data": [
        {
          "ng-apimock-dataTemplate": "default"
        },
        {
          "another": "thing"
        }
      ],
      "headers": {
        "ng-apimock-headersTemplate": "default"
      }
    },
    "scenario-2": {
      "status": 200,
      "data": [
        {
          "ng-apimock-dataTemplate": "default"
        },
        {
          "ng-apimock-dataTemplate": "with-globals"
        }
      ],
      "headers": {
        "ng-apimock-headersTemplate": "default"
      }
    }
  }
}
```

This will output **single.api.file.json**

```js
{
  "expression": "single/api/file",
  "method": "GET",
  "name": "single.api.file",
  "isArray": true,
  "responses": {
    "scenario-1": {
      "default": true,
      "status": 200,
      "data": [
        {
          "some": {
            "thing": "else"
          },
          "another": "thing"
        },
        {
          "another": "thing"
        }
      ],
      "headers": {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "https://www.example.com",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Date": "%%today%%"
      }
    },
    "scenario-2": {
      "status": 200,
      "data": [
        {
          "some": {
            "thing": "else"
          },
          "another": "thing"
        },
        {
          "type": 30,
          "typeName": "Thirty",
          "start-event": {
            "timestamp": "%%yesterday%%",
            "text": "Thirty something"
          },
          "end-event": {
            "timestamp": "%%today%%",
            "text": "Thirty something"
          }
        }
      ],
      "headers": {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "https://www.example.com",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Date": "%%today%%"
      }
    }
  }
}
```