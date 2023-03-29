import { compare, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
const verifyPassword = async (password: string, hashPass: string) => {
  return !(await compare(password, hashPass)) ? false : true;
};
const verifyToken = async (token: string) => {
  try {
    const result = await verify(
      token,
      process.env.NEXT_PUBLIC_SECRET_KEY || ""
    );
    return result;
  } catch (err) {
    return false;
  }
};

export { hashPassword, verifyPassword, verifyToken };
