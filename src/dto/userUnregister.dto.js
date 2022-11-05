import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addError from 'ajv-errors';
import { passwordDTO } from '#Lib/dtoSchemas.js';
const unregisterDTOSchema = Type.Object(
  {
    password: passwordDTO,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'the format of object no valid',
    },
  }
);
const ajv = new Ajv({ allErrors: true })
  .addKeyword('kind')
  .addKeyword('modifier');
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addError(ajv);
const validateSchema = ajv.compile(unregisterDTOSchema);
const userUnregisterDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });
  next();
};
export default userUnregisterDTO;
