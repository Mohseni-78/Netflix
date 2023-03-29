import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
  },
  family: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
