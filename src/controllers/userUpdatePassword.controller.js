import { salt } from '#Constants/salt.js';
import UserModel from '#Schemas/user.schema.js';
import { hash, compare } from 'bcrypt';
const userUpdateEmailController = async (req, res) => {
  const { id } = req;
  const { oldPassword, newPassword } = req.body;
  const updateUserById = await UserModel.findById(id).exec();
  if (!updateUserById)
    return res.status(401).send({ errors: ['credentials incorrect'] });
  const checkPassword = await compare(oldPassword, updateUserById.password);
  if (!checkPassword)
    return res.status(401).send({ errors: ['credentials incorrect'] });
  const hashedPassword = await hash(newPassword, salt);
  updateUserById.password = hashedPassword;
  await updateUserById.save();
  return res.send('Update password');
};
export default userUpdateEmailController;
