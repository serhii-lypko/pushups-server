import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    id: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resultCommitments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResultCommit",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
