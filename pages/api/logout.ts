import { NextApiRequest, NextApiResponse } from "next";
// Imported Utils
import connectDb from "@/utils/connectDb";
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
  if (req.method !== "GET") {
    return res.status(401).json({ status: "Failed", message: "Bad Request" });
  }
  const setCookie = serialize("token", "", {
    maxAge: 0,
    path: "/",
  });
  return res
    .status(200)
    .setHeader("Set-Cookie", setCookie)
    .json({ status: "Success", message: "Logout Success" });
}
