import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
const userUnregisterController = async (req, res) => {
  const { id } = req;
  const { password } = req.body;
  const updateUserById = await UserModel.findById(id).exec();
  if (!updateUserById)
    return res.status(401).send({ errors: ['credentials incorrect'] });
  const checkPassword = await compare(password, updateUserById.password);
  if (!checkPassword)
    return res.status(401).send({ errors: ['credentials incorrect'] });
  await updateUserById.delete();
  return res.send('user delete');
};
export default userUnregisterController;
