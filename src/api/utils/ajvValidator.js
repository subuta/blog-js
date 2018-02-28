import {AjvValidator} from 'objection'

const validator = new AjvValidator({
  onCreateAjv: (ajv) => {},
  options: {
    allErrors: true,
    validateSchema: false,
    ownProperties: true,
    removeAdditional: true,
    useDefaults: true
  }
})

export default validator
