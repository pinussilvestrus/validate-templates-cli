#!/usr/bin/env node

const mri = require('mri');

const fs = require('fs');

const schema = require('@camunda/element-templates-json-schema/resources/schema.json');

const Validator = require('@bpmn-io/json-schema-validator').Validator;

const HELP_INFO = `
Usage
    $ validate-templates samples.json
Examples
    $ validate-templates ./resources/errors.json`;


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

    filteredSchemaErrors(errors).forEach(function(error) {
      console.log('  *', error.message);
    });
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

  console.log();
  console.log(`Validating ${templates.length} template(s)...`);

  const {
    valid,
    results
  } = validate(templates);

  if (!valid) {
    printErrors(results);

    process.exit(0);
  }

  console.log();
  console.log('Templates are valid!');

}


run();


// helpers ///////////////

function filteredSchemaErrors(schemaErrors) {
  return schemaErrors.filter(function(err) {

    // (1) regular errors are customized from the schema
    if (err.keyword === 'errorMessage') {
      return true;
    }

    // (2) data type errors are relevant, except for
    // (scope) root level data type errors due to basic schema errors
    if (err.keyword === 'type' && err.dataPath && err.dataPath !== '/scopes') {
      return true;
    }

    return false;
  });
}