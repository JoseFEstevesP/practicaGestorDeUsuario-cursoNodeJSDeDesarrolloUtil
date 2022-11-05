import UserModel from '#Schemas/user.schema.js';
const userUpdateDataController = async (req, res) => {
  const { id } = req;
  const { name, surname } = req.body;
  const updateUserById = await UserModel.findById(id).exec();
  if (!updateUserById)
    return res.status(401).send({ errors: ['credentials incorrect'] });
  updateUserById.name = name;
  updateUserById.surname = surname;
  await updateUserById.save();
  return res.send('Update user');
};
export default userUpdateDataController;
