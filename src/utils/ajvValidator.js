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

// force override ajv schema.
export const setSchema = (schema = {}) => {
  const $id = schema.$id || schema.id
  if (!$id) return
  // remove pre-added schemas first.
  validator.ajv.removeSchema($id)
  // then add passed schema
  validator.ajv.addSchema(schema)
}

export default validator
