#!/usr/bin/env node

const mri = require('mri');

const fs = require('fs');

const schema = require('@camunda/element-templates-json-schema/resources/schema.json');

const Validator = require('@bpmn-io/json-schema-validator').Validator;

const HELP_INFO = `
Usage
    $ validate-templates samples.json
  Examples
    $ validate-templates ./resources/errors.json
`;


function validate(templates) {

  const validator = new Validator({
    schema: schema
  });

  return validator.validateAll(templates);
}

function printErrors(results) {

  results.forEach(function(result) {

    const {
      object,
      valid,
      errors
    } = result;

    if (valid) {
      return;
    }

    console.log();
    console.log(`Invalid Template (name: <${object.name}>, id: <${object.id}>) found.`);

    errors.forEach(function(error) {
      console.log(' *', error.message);
    });

    console.log();
  });
}

function readFile(path) {
  const contents = fs.readFileSync(path, 'utf8');
  return JSON.parse(contents);
}

function run() {

  const {
    help,
    _: files
  } = mri(process.argv.slice(2));

  const file = files[0];

  if (help || !file) {
    console.log(HELP_INFO);

    process.exit(0);
  }

  const templates = readFile(file);

  console.log(`Validating ${templates.length} template(s)...`);

  const {
    valid,
    results
  } = validate(templates);

  if (!valid) {
    printErrors(results);

    process.exit(1);
  }

  console.log('Templates are valid!');

}


run();