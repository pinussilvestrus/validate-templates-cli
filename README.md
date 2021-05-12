# validate-templates-cli

[![CI](https://github.com/pinussilvestrus/validate-templates-cli/workflows/CI/badge.svg)](https://github.com/pinussilvestrus/validate-templates-cli/actions?query=workflow%3ACI)

Command Line Tool to validate Camunda Element Templates, based on

* [`@bpmn-io/element-templates-validator`](https://github.com/bpmn-io/element-templates-validator) - Validate element templates based on JSON Schema
*  [`@camunda/element-templates-json-schema`](https://github.com/camunda/element-templates-json-schema) - JSON Schema for (Camunda) Element Templates

## Usage

Install the command line tool via `npm`:

```sh
npm install -g validate-templates-cli
```

or use it directly via `npx`:

```text
> npx validate-templates ./resources/errors.json

Validating 1 templates...

Invalid Template (name: <Mail Task>, id: <com.camunda.example.MailTask>) found.
 * invalid property type "Foo" for binding type "property"; must be any of { String, Text, Hidden, Dropdown, Boolean }
 * must provide choices=[] with "Dropdown" type
 * property.binding "camunda:outputParameter" requires source
 * property.binding "property" requires name
```


## License

MIT