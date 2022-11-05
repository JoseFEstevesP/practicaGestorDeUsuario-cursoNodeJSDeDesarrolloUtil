import { Type } from "@sinclair/typebox";
export const idDTO = Type.String({
  format: 'uuid',
  errorMessage: {
    type: 'the type of _id no valid, type valid is a string text',
    format: 'the format of _id no valid, must be uuid4',
  },
});
export const nameDTO = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    minLength: 'the user name must min length 2 character',
    maxLength: 'the user name must max length 20 character',
  },
});
export const surnameDTO = Type.String({
  minLength: 4,
  maxLength: 50,
  errorMessage: {
    minLength: 'the user surname must min length 4 character',
    maxLength: 'the user surname must max length 50 character',
  },
});
export const emailDTO = Type.String({
  format: 'email',
  errorMessage: {
    type: 'the type of email no valid, type valid is a string text',
    format: 'the format of email no valid, must comply the to format RFC 5322',
  },
});
export const passwordDTO = Type.String({
  format: 'password',
  minLength: 10,
  maxLength: 25,
  errorMessage: {
    type: 'the type of password no valid, type valid is a string text',
    format:
      'the format of the password, must contain one uppercase, one lowercase and number',
    minLength: 'the user password must min length 10 characters',
    maxLength: 'the user password must max length 25 character',
  },
});
