const { expect } = require('chai');

const { execSync } = require('child_process');

const test = (args) => {
  return execSync(`bin/validate-templates.js ${args}`).toString();
};

describe('CLI', () => {

  it('should show help', () => {
    expect(test('--help')).to.equal(
      `
Usage
    $ validate-templates samples.json
Examples
    $ validate-templates ./resources/errors.json
`
    );
  });


  it('should validate - no errors', () => {
    expect(test('./resources/samples.json')).to.equal(`
Validating 1 template(s)...

Templates are valid!
`
    );
  });


  it('should validate - errors', () => {

    expect(test('./resources/errors.json')).to.equal(`
Validating 1 template(s)...

Invalid Template (name: <Mail Task>, id: <com.camunda.example.MailTask>) found.
  * invalid property type "Foo" for binding type "property"; must be any of { String, Text, Hidden, Dropdown, Boolean }
  * must provide choices=[] with "Dropdown" type
  * property.binding "camunda:outputParameter" requires source
  * property.binding "property" requires name
`
    );
  });

});