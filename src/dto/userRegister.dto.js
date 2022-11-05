import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addError from 'ajv-errors';
import {
  emailDTO,
  idDTO,
  nameDTO,
  passwordDTO,
  surnameDTO,
} from '#Dto/dtoSchemas.js';
const registerDTOSchema = Type.Object(
  {
    _id: idDTO,
    name: nameDTO,
    surname: surnameDTO,
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
addFormats(ajv, ['email', 'uuid']);
addError(ajv);
const validateSchema = ajv.compile(registerDTOSchema);
const userRegisterDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });
  next();
};
export default userRegisterDTO;
