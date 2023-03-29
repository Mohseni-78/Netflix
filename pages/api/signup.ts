import { NextApiRequest, NextApiResponse } from "next";
// Imported Models
import User from "@/models/User";
// Imported Utils
import connectDb from "@/utils/connectDb";
import { hashPassword } from "@/utils/functions";

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
  const { name, family, email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    return res.status(401).json({ status: "Failed", message: "Invalid Data" });
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res
      .status(401)
      .json({ status: "Failed", message: "User Exist Please Login" });
  }
  if (password !== confirmPassword) {
    return res.status(401).json({
      status: "Failed",
      message: "Confirm Password Must Be Match by Password",
    });
  }
  try {
    const user = await User.create({
      name,
      family,
      email,
      password: await hashPassword(password),
    });
    return res
      .status(201)
      .json({ status: "Success", message: "User Create Succefully", user });
  } catch (err) {
    return res.status(500).json({ status: "Failed", message: "Server Errors" });
  }
}
