# YAML examples
You can use the extension `.yml` or `.yaml`. The files are parsed with the module [`js-yaml`](https://github.com/nodeca/js-yaml).

> **Please refer to the [YAML-docs](http://www.yaml.org/spec/1.2/spec.html) about how to write YAML files or use [js-yaml-demo](http://nodeca.github.io/js-yaml/) to test your YAML syntax.**

## Example template for multiple mockfiles
Below example template will generate 2 json files because 2 mockDataFiles are defined. This is a very simple example and will look like there will be much code to generate an example, but the advantage will be when you use a lot of repetitive headers or data.

```yaml
dataTemplates:
  string:
    string: foo && bar
  number:
    number: 12324
headersTemplates:
  1: !!map
    Access-Control-Allow-Methods: PUT
    Content-type: application/json
  2: !!map
    Access-Control-Allow-Origin: https://www.foo.bar.yml
    Content-type: application/pdf
mockDataFiles:
  - fileName: foo.bar.1.yml
    expression: foo.bar.yml.1.foo
    method: PUT
    name: foo.foo
    isArray: true
    responses:
      foo:
        default: true
        status: 200
        data:
          - ng-apimock-dataTemplate: string
          - ng-apimock-dataTemplate: number
            bar: foo
        headers:
          ng-apimock-headersTemplate: "2"
      bar:
        status: 200
        data:
          - string: bla foo bar
        headers: !!map
          ng-apimock-headersTemplate: "1"
          Cache-Control: no-cache no-store must-revalidate
  - fileName: foo.bar.2.yml
    expression: foo.bar.yml.2.foo
    method: PUT
    name: foo.foo
    isArray: true
    responses:
      foo:
        default: true
        status: 200
        data:
          - ng-apimock-dataTemplate: string
          - ng-apimock-dataTemplate: number
            bar: foo
        headers:
          ng-apimock-headersTemplate: "2"
      bar:
        status: 200
        data:
          - string: bla foo bar
        headers: !!map
          ng-apimock-headersTemplate: "1"
          Cache-Control: no-cache no-store must-revalidate
```

This will output 2 files **foo.bar.1.yml.json**

```js
{
  "expression": "foo.bar.yml.1.foo",
  "method": "PUT",
  "name": "foo.foo",
  "isArray": true,
  "responses": {
    "foo": {
      "default": true,
      "status": 200,
      "data": [
        {
          "string": "foo && bar"
        },
        {
          "number": 12324,
          "bar": "foo"
        }
      ],
      "headers": {
        "Access-Control-Allow-Origin": "https://www.foo.bar.yml",
        "Content-type": "application/pdf"
      }
    },
    "bar": {
      "status": 200,
      "data": [
        {
          "string": "bla foo bar"
        }
      ],
      "headers": {
        "Access-Control-Allow-Methods": "PUT",
        "Content-type": "application/json",
        "Cache-Control": "no-cache no-store must-revalidate"
      }
    }
  }
}
```

And **foo.bar.2.yml.json**

```js
{
  "expression": "foo.bar.yml.2.foo",
  "method": "PUT",
  "name": "foo.foo",
  "isArray": true,
  "responses": {
    "foo": {
      "default": true,
      "status": 200,
      "data": [
        {
          "string": "foo && bar"
        },
        {
          "number": 12324,
          "bar": "foo"
        }
      ],
      "headers": {
        "Access-Control-Allow-Origin": "https://www.foo.bar.yml",
        "Content-type": "application/pdf"
      }
    },
    "bar": {
      "status": 200,
      "data": [
        {
          "string": "bla foo bar"
        }
      ],
      "headers": {
        "Access-Control-Allow-Methods": "PUT",
        "Content-type": "application/json",
        "Cache-Control": "no-cache no-store must-revalidate"
      }
    }
  }
}
```

## Example template for 1 mockfile

> needs to be writen