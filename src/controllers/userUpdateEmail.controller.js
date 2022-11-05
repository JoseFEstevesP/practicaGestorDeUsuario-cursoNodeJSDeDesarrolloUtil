import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
const userUpdateEmailController = async (req, res) => {
  const { id } = req;
  const { email, password } = req.body;
  const updateUserById = await UserModel.findById(id).exec();
  if (!updateUserById) return res.status(401).send('credentials incorrect');
  const checkPassword = await compare(password, updateUserById.password);
  if (!checkPassword) return res.status(401).send('credentials incorrect');
  updateUserById.email = email;
  await updateUserById.save();
  return res.send('Update email');
};
export default userUpdateEmailController;
