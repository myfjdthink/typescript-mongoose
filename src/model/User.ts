import {Document, Schema, Model, model} from "mongoose";
import {IUser} from "../interfaces/User";

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

export const UserSchema: Schema = new Schema({
  createdAt: Date,
  email: String,
  firstName: {type: String, required: true},
  lastName: {type: String, required: true}
});
UserSchema.pre("save", function (next) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
UserSchema.methods.fullName = function (): string {
  return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);