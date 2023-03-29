import { NextApiRequest, NextApiResponse } from "next";
// Imported Models
import User from "@/models/User";
// Imported Utils
import connectDb from "@/utils/connectDb";
import { verifyPassword } from "@/utils/functions";
// Imported jsonwebtoken method
import { sign } from "jsonwebtoken";
// Imported cookie method
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
  } catch (err) {
    return res.status(500).json({ status: "Failed", message: "Server Error" });
  }
  if (req.method !== "POST") {
    return res.status(401).json({ status: "Failed", message: "Bad Request" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ status: "Failed", message: "Invalid Data" });
  }
  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res
      .status(401)
      .json({ status: "Failed", message: "User Not Exist" });
  }
  if (!(await verifyPassword(password, existUser.password))) {
    return res
      .status(401)
      .json({ status: "Failed", message: "Email or Password Is Not Correct" });
  }
  try {
    const token = sign(
      {
        email,
        name:existUser.name
      },
      process.env.NEXT_PUBLIC_SECRET_KEY || "",
      { expiresIn: 24 * 60 * 60 }
    );
    const setCookie = serialize("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      path: "/",
    });
    return res
      .status(200)
      .setHeader("Set-Cookie", setCookie)
      .json({ status: "Success", message: "Welcome Back" });
  } catch (err) {
    return res.status(500).json({ status: "Failed", message: "Server Errors" });
  }
}
