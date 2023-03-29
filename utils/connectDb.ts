import  { connect, connections } from "mongoose";

const connectDb = async () => {
  try {
    if (!connections[0].readyState) {
      await connect(process.env.NEXT_PUBLIC_MONGO_KEY || "");
      console.log("Connect to db");
    }
  } catch (err) {
    console.log("failed to connect db");
  }
};
export default connectDb;
