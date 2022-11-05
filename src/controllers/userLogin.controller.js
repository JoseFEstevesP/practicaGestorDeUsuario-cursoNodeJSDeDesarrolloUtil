import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';
const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  const exitingUserByEmail = await UserModel.findOne({ email }).exec();
  if (!exitingUserByEmail) return res.status(401).send('credentials incorrect');
  const checkPassword = await compare(password, exitingUserByEmail.password);
  if (!checkPassword) return res.status(401).send('credentials incorrect');
  const jwtConstructor = new SignJWT({ id: exitingUserByEmail._id });
  const encoder = new TextEncoder();
  const jwt = await jwtConstructor
    .setProtectedHeader({
      alg: 'HS256',
      type: 'JWT',
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
  return res.send({ jwt });
};
export default userLoginController;
