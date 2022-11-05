import UserModel from '#Schemas/user.schema.js';
const userProfileController = async (req, res) => {
  const { id } = req;
  const exitingUserById = await UserModel.findById(id).exec();
  if (!exitingUserById) return res.status(401).send('credentials incorrect');
  const { _id, name, surname, email } = exitingUserById;
  return res.send({ _id, name, surname, email });
};
export default userProfileController;
