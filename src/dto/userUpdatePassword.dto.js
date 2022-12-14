import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addError from 'ajv-errors';
import { passwordDTO } from '#Dto/dtoSchemas.js';
const updatePasswordDTOSchema = Type.Object(
  {
    oldPassword: passwordDTO,
    newPassword: passwordDTO,
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
const validateSchema = ajv.compile(updatePasswordDTOSchema);
const userUpdatePasswordDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });
  next();
};
export default userUpdatePasswordDTO;
