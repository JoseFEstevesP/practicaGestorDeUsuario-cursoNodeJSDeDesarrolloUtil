import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addError from 'ajv-errors';
import { emailDTO, passwordDTO } from '#Dto/dtoSchemas.js';
const loginDTOSchema = Type.Object(
  {
    email: emailDTO,
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
addFormats(ajv, ['email']);
addError(ajv);
const validateSchema = ajv.compile(loginDTOSchema);
const userLoginDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });
  next();
};
export default userLoginDTO;
