import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addError from 'ajv-errors';
import { nameDTO, surnameDTO } from '#Lib/dtoSchemas.js';
const updateDataDTOSchema = Type.Object(
  {
    name: nameDTO,
    surname: surnameDTO,
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
addError(ajv);
const validateSchema = ajv.compile(updateDataDTOSchema);
const userUpdateDataDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send({ errors: validateSchema.errors.map((error) => error.message) });
  next();
};
export default userUpdateDataDTO;
