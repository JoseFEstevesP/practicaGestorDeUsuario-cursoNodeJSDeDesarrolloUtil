import { salt } from '#Constants/salt.js';
import UserModel from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';
const userRegisterController = async (req, res) => {
  const { _id, name, surname, email, password } = req.body;
  const exitsUserById = await UserModel.findById(_id).exec();
  if (exitsUserById)
    return res.status(409).send({ errors: ['this user exits'] });
  const exitsUserByEmail = await UserModel.findOne({ email }).exec();
  if (exitsUserByEmail)
    return res.status(409).send({ errors: ['this email exits'] });
  const hashedPassword = await hash(password, salt);
  const user = new UserModel({
    _id,
    name,
    surname,
    email,
    password: hashedPassword,
  });
  await user.save();
  return res.status(201).send('register of user successful');
};
export default userRegisterController;
