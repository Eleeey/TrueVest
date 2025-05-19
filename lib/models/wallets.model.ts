import { Schema, model, models, Document } from "mongoose";

export interface IWallet extends Document {
  id: number;
  walletAddress: string;
  type: string;
}

const walletSchema = new Schema<IWallet>({
  id: { type: Number, required: true, unique: true },
  walletAddress: { type: String, required: true },
  type: { type: String, required: true },
});

const Wallet = models.Wallet || model<IWallet>("Wallet", walletSchema);

export default Wallet;
