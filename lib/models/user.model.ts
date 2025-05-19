import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name:string;
  Balance: number;
  verified: 0 | 1 | 2;
  history: {
    amount: number;
    confirmed: boolean;
    receipt?: string;
    type: "credit" | "debit";
    date: Date;

  }[];
  deposit: number;

}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  name:{type:String,requires:true},
  Balance: { type: Number, required: true },
  verified: { type: Number, enum: [0, 1, 2], required: true, default: 0 },
  history: [
    {
      amount: { type: Number, required: true },
      confirmed: { type: Boolean, required: true },
      receipt: { type: String, required: false },
      type: { type: String, enum: ["credit", "debit"], required: true },
      date: { type: Date, required: true, default: Date.now },
    },
  ],
  deposit: { type: Number, required: true, default: 0 },

});

const User = models.User || model<IUser>("User", userSchema);

export default User;
