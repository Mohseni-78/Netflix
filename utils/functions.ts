// Imported bcryptjs Method ===========>
import { compare, hash } from "bcryptjs";
// Imported jsonwebtoken Method ===========>
import { verify } from "jsonwebtoken";

// For hash password
const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
// For verify password
const verifyPassword = async (password: string, hashPass: string) => {
  return !(await compare(password, hashPass)) ? false : true;
};
// For verify token
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
